import React, { createContext, useContext } from 'react';
import { getLocalDB, getRemoteDB } from './db';
import { useLocalObservable } from 'mobx-react-lite'
import { observable } from 'mobx';
import { DocModel, GameModel, Store } from './interfaces';
import { Auth } from './auth';

// eslint-disable-next-line @typescript-eslint/camelcase
const POUCH_REQ_CONF = { include_docs: true, attachments: true, binary: true };

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
  const db = getLocalDB(); 

  const store : Store = {
    userName: undefined,
    isInitialized: false,
    db,
    games: observable.array([], { deep: false, proxy: false }),

    get isAuthenticated() {
      return !!this.userName;
    },

    async authorize(this: Store, userName: string, remotePouchDB: PouchDB.Database) {
      this.userName = userName;
      return this.db.syncWithRemoteDB(remotePouchDB);
    },

    async fetchGameModels() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const docs = await db.pouchDB.allDocs<DocModel>(POUCH_REQ_CONF);
      const models = docs.rows.map(({ doc}) => doc && doc2model(doc)).filter((model) => !!model) as GameModel[];
      return models;
    },

    async initialize() {
      const gameModels = await store.fetchGameModels();
      store.games.replace(gameModels);
      store.db.pouchDB.changes<DocModel>({ since: 'now', live: true, ...POUCH_REQ_CONF}).on('change', (change) => {
        if (change.doc) {
          const model = doc2model(change.doc);
          const idx = store.games.findIndex((game) => game.id === model.id);
          if (idx >= 0) {
            store.games.spliceWithArray(idx, 1, [model]);
          } else {
            store.games.push(model);
          }
        }
      });
      const username = localStorage.getItem('userName');
      if (username) {
        const isAuthenticated = await Auth.isAuthenticated(username);
        if (isAuthenticated) {
          console.log(username, 'isAuthenticated')
          store.db.syncWithRemoteDB(getRemoteDB(username));
        }
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