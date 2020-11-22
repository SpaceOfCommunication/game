import React, { createContext, useContext } from 'react';
import { getLocalDB, getRemoteDB } from './db';
import { useLocalObservable } from 'mobx-react-lite'
import { observable } from 'mobx';
import { DocModel, GameModel, Store } from './interfaces';
import { Auth } from './auth';

// eslint-disable-next-line @typescript-eslint/camelcase
const POUCH_REQ_CONF = { include_docs: true, attachments: true, binary: true };
let pouchChangesListener: PouchDB.Core.Changes<DocModel>;

function doc2model(doc: PouchDB.Core.ExistingDocument<DocModel>): GameModel {
  const gameModel: GameModel = {
    id: doc._id,
    rev: doc._rev,
    title: doc.title,
    screens: [],
    audioDuration: doc.audioDuration,
  };
  for (let i = 0; i < Object.keys(doc._attachments).length / 2; i++) {
    gameModel.screens.push({
      picture: doc._attachments[`img-${i}`].data,
      audio: doc._attachments[`sfx-${i}`].data,
    })
  }
  return gameModel;
}

function createStore() {
  const store : Store = {
    userName: observable.box(),
    isInitialized: false,
    db: getLocalDB(),
    games: observable.array([], { deep: false, proxy: false }),

    get isAuthenticated() {
      return !!this.userName.get();
    },

    async authorize(userName: string, remotePouchDB: PouchDB.Database) {
      store.userName.set(userName);
      return store.db.syncWithRemoteDB(remotePouchDB);
    },

    async logout() {
      const userName = store.userName?.get();
      if (!userName) {
        return;
      }
      store.db.cancelSync();
      pouchChangesListener.cancel();
      await Auth.logout(userName);
      store.db.destroy();
      store.db = getLocalDB();
      store.games.clear();
      store.userName.set('');
      // await store.initialize();
    },

    async fetchGameModels() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const docs = await store.db.pouchDB.allDocs<DocModel>(POUCH_REQ_CONF);
      const models = docs.rows.map(({ doc}) => doc && doc2model(doc)).filter((model) => !!model) as GameModel[];
      return models;
    },

    async initialize() {
      const gameModels = await store.fetchGameModels();
      store.games.replace(gameModels);
      pouchChangesListener = store.db.pouchDB.changes<DocModel>({ since: 'now', live: true, ...POUCH_REQ_CONF}).on('change', (change) => {
        if (change.deleted) {
          const game = store.games.find((game) => game.id === change.id);
          if (game) {
            store.games.remove(game);
          }
        } else if (change.doc) {
          const model = doc2model(change.doc);
          const idx = store.games.findIndex((game) => game.id === model.id);
          if (idx >= 0) {
            store.games.spliceWithArray(idx, 1, [model]);
          } else {
            store.games.push(model);
          }
        }
      });
      // const username = localStorage.getItem('userName');
      const userName = await Auth.getUserName();
      if (userName) {
        store.userName.set(userName);
        store.db.syncWithRemoteDB(getRemoteDB(userName));
      }
      store.isInitialized = true;
    }
  };

  store.initialize();
  console.log('creation');

  return store;
}

const StoreContext = createContext<null | Store>(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(createStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store
}