import * as PouchDB from 'pouchdb';
import * as PouchAuthentication from 'pouchdb-authentication';

PouchDB.plugin(PouchAuthentication);

export class DB {
  private _db: PouchDB.Database

  constructor(url: string, login: string, password: string) {
    this._db = new PouchDB(url, {
      auth: {
        username: login,
        password: password
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      skip_setup: true 
    });
  }

  signUp(username: string, password: string) {
    return this._db.signUp(username, password);
  }
}