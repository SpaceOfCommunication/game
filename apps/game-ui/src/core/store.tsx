import React, { createContext, useContext } from 'react';
import { DB, getLocalDB } from './db';
import { useLocalStore } from 'mobx-react'

export interface Store {
  userName?: string;
  db: DB;
  isAuthenticated: boolean;
  authorize(userName: string, remotePouchDB: PouchDB.Database): void;
}

function createStore(): Store {
  return {
    userName: undefined,
    db: getLocalDB(),

    get isAuthenticated() {
      return !!this.userName;
    },

    authorize(this: Store, userName: string, remotePouchDB: PouchDB.Database) {
      this.userName = userName;
      this.db.syncWithRemoteDB(remotePouchDB);
    }
  }
}

const StoreContext = createContext<null | Store>(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}