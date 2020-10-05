import React, { createContext, useContext } from 'react';
import { DB, getLocalDB } from './db';
import { useLocalObservable } from 'mobx-react-lite'

export interface Game {
  title: string;
  picture: Blob;
  audio: Blob
}

export interface Store {
  userName?: string;
  db: DB;
  games: Game[];
  isAuthenticated: boolean;
  isInitialized: boolean;
  authorize(userName: string, remotePouchDB: PouchDB.Database): Promise<void>;
  fetchGames(): Promise<unknown[]>;
  initialize(): Promise<void>;
}

function createStore(): Store {
  const db = getLocalDB(); 

  const store = {
    userName: undefined,
    isInitialized: false,
    db,
    games: [],

    get isAuthenticated() {
      return !!this.userName;
    },

    async authorize(this: Store, userName: string, remotePouchDB: PouchDB.Database) {
      this.userName = userName;
      return this.db.syncWithRemoteDB(remotePouchDB);
    },

    async fetchGames() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const docs = await db.pouchDB.allDocs({ include_docs: true, attachments: true });
      console.log('docs', docs);
      return docs.rows;
    },

    async initialize() {
      await store.fetchGames();
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
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}