import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';
import { environment } from '../environments/environment';

PouchDB.plugin(PouchAuthentication);

export function getLocalDB() {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return new DB(new PouchDB('localUserDB', { skip_setup: true }));
}

export function getRemoteDB(userName: string) {
  const DBName = `userdb-${hexEncode(userName)}`;
  // eslint-disable-next-line @typescript-eslint/camelcase
  return new PouchDB(`${environment.pouchURL}/${DBName}`, { skip_setup: true });
}


function hexEncode(text: string) {
  let hex: string;
  let result = "";
  for (let i = 0; i < text.length; i++) {
    hex = text.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }
  return result;
}

export class DB {
  
  constructor(public pouchDB: PouchDB.Database) {}

  public syncWithRemoteDB(remotePouchDB: PouchDB.Database) {
    this.pouchDB.sync(remotePouchDB, {live: true, retry: true});
  }

}