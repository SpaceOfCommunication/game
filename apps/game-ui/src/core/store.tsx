/* eslint-disable @typescript-eslint/camelcase */
import React, { createContext, useContext } from 'react';
import { getLocalDB, getRemoteDB } from './db';
import { useLocalObservable } from 'mobx-react-lite'
import { observable } from 'mobx';
import { DocModel, GameModel, Store } from './interfaces';
import { Auth } from './auth';
import demoGameImage from '../assets/demo-game.jpeg';
import { DEFAULT_MELODY_DURATION } from './constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const demoGameAudio = require('../assets/demo-game.mp3');

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
  const store: Store = {
    userName: observable.box(),
    isInitialized: observable.box(-1),
    loading: observable.box(0),
    db: getLocalDB(),
    games: observable.array([], { deep: false, proxy: false }),

    get isAuthenticated() {
      return !!this.userName.get();
    },

    async authorize(userName: string, remotePouchDB: PouchDB.Database) {
      store.userName.set(userName);
      store.incrementLoading();
      return store.db.syncWithRemoteDB(remotePouchDB).then(() => store.decrementLoading()).catch(() => store.decrementLoading());;
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
    },

    async fetchGameModels() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const docs = await store.db.pouchDB.allDocs<DocModel>(POUCH_REQ_CONF);
      const models = docs.rows.map(({ doc }) => doc && doc2model(doc)).filter((model) => !!model) as GameModel[];
      return models;
    },

    incrementLoading() {
      console.log('loading start')
      store.loading.set(store.loading.get() + 1);
    },

    decrementLoading() {
      console.log('loading stop')
      store.loading.set(store.loading.get() - 1 || 0);
    },

    async initialize() {
      if (store.isInitialized.get() > -1) {
        return;
      }
      store.isInitialized.set(0);
      const gameModels = await store.fetchGameModels();
      store.games.replace(gameModels);
      pouchChangesListener = store.db.pouchDB.changes<DocModel>({ since: 'now', live: true, ...POUCH_REQ_CONF }).on('change', (change) => {
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
      if (gameModels.length === 0) {
        const [demoImage, demoAudio] = await Promise.all([
          fetch(demoGameImage),
          fetch(demoGameAudio),
        ]).then((([img, sfx]) => Promise.all([img.blob(), sfx.blob()])));

        const _attachments: DocModel["_attachments"] = {
          'img-0': {
            content_type: demoImage.type,
            data: demoImage
          },
          'sfx-0': {
            content_type: demoAudio.type,
            data: demoAudio
          }
        };
        await store.db.pouchDB.post<DocModel>({ title: 'Пример игры', audioDuration: DEFAULT_MELODY_DURATION, _attachments });
      }
      try {
        const userName = await Auth.getUserName();
        if (userName) {
          store.userName.set(userName);
          store.incrementLoading();
          store.db.syncWithRemoteDB(getRemoteDB(userName)).then(() => store.decrementLoading()).catch(() => store.decrementLoading());
        }
      } catch (err) {
        console.error(err);
      }
      store.isInitialized.set(1);
    }
  };
  store.initialize();
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