import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';
import { environment } from '../environments/environment';

PouchDB.plugin(PouchAuthentication);

// eslint-disable-next-line @typescript-eslint/camelcase
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

  private _sync?: PouchDB.Replication.Sync<any>;

  constructor(public pouchDB: PouchDB.Database) { }

  public syncWithRemoteDB(remotePouchDB: PouchDB.Database) {
    this.pouchDB.replicate.to(remotePouchDB).on('complete', () => {
      this._sync = this.pouchDB.sync(remotePouchDB, { live: true, retry: false });
    }).on('error', (err) => {
      console.error('ERROR', err);
    });
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