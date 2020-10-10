import React, { createContext, useContext } from 'react';
import { getLocalDB } from './db';
import { useLocalObservable } from 'mobx-react-lite'
import { observable } from 'mobx';
import { DocModel, GameModel, Store } from './interfaces';

function doc2model(doc: PouchDB.Core.ExistingDocument<DocModel>): GameModel {
  const gameModel: GameModel = {
    id: doc._id,
    title: doc.title,
    screens: [],
  };
  for (let i = 0; i < Object.keys(doc._attachments).length / 2; i++) {
    gameModel.screens.push({
      picture: doc._attachments[`img-${i}`].data,
      audio: doc._attachments[`sfx-${i}`].data,
    })
  }
  return gameModel;
}

// function model2game(model: GameModel): Game {
//   const { id, title, screens } = model;
//   return {
//     id,
//     title,
//     screens: screens.map(({ picture, audio }) => ({ 
//       picture: URL.createObjectURL(picture),
//       audio: URL.createObjectURL(audio),
//     })),
//   }
// }

function createStore() {
  const db = getLocalDB(); 

  const store : Store = {
    userName: undefined,
    isInitialized: false,
    db,
    games: observable([]),

    get isAuthenticated() {
      return !!this.userName;
    },

    async authorize(this: Store, userName: string, remotePouchDB: PouchDB.Database) {
      this.userName = userName;
      return this.db.syncWithRemoteDB(remotePouchDB);
    },

    async fetchGameModels() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const docs = await db.pouchDB.allDocs<DocModel>({ include_docs: true, attachments: true, binary: true });
      const models = docs.rows.map(({ doc}) => doc && doc2model(doc)).filter((model) => !!model) as GameModel[];
      return models;
    },

    async initialize() {
      const gameModels = await store.fetchGameModels();
      // const games = gameModels.map(model2game);
      store.games.replace(gameModels);
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