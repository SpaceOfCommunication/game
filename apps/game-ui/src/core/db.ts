/* eslint-disable @typescript-eslint/camelcase */
import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';
import { environment } from '../environments/environment';

PouchDB.plugin(PouchAuthentication);

const pouchConfig = { skip_setup: false, auto_compaction: true };

export function getLocalDB() {
  return new DB(new PouchDB('localUserDB', pouchConfig));
}

export function getRemoteDB(userName: string) {
  const DBName = `userdb-${hexEncode(userName)}`;
  return new PouchDB(`${environment.pouchURL}/${DBName}`, pouchConfig);
}

export function getRemoteAuthDB() {
  return new PouchDB(`${environment.pouchURL}`, pouchConfig);
}

function hexEncode(text: string) {
  let hex = '';
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16);
  }
  return hex
}

export class DB {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _sync?: PouchDB.Replication.Sync<any>;

  constructor(public pouchDB: PouchDB.Database) { }

  public syncWithRemoteDB(remotePouchDB: PouchDB.Database) {
    let resolve: (value: unknown) => void;
    let reject: (reason: unknown) => void;
    const result = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.pouchDB.replicate.to(remotePouchDB, { batch_size: 2 }).on('complete', () => {
      this.pouchDB.replicate.from(remotePouchDB, { batch_size: 2 })
        .on('complete', () => {
          resolve(true);
          this._sync = this.pouchDB.sync(remotePouchDB,  { live: true, retry: false });
        })
        .on('error', (err) => reject(err))
        .on('denied', (err) => reject(err));
    }).on('error', (err) => {
      reject(err);
      console.error('Replication error', err);
    }).on('denied', (err) => {
      reject(err);
      console.error('Replication denied', err);
    });
    return result;
  }
  
  public cancelSync() {
    if (this._sync) {
      this._sync.cancel();
    }
  }

  public destroy() {
    this.pouchDB.destroy();
  }

}