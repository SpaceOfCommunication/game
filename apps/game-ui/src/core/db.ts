import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';
import { environment } from '../environments/environment';

PouchDB.plugin(PouchAuthentication);

  // eslint-disable-next-line @typescript-eslint/camelcase
const pouchConfig = { skip_setup: true, auto_compaction: true };

export function getLocalDB() {
  return new DB(new PouchDB('localUserDB', pouchConfig));
}

export function getRemoteDB(userName: string) {
  const DBName = `userdb-${hexEncode(userName)}`;
  return new PouchDB(`${environment.pouchURL}/${DBName}`, pouchConfig);
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