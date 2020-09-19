import PouchDB from 'pouchdb';

export class DB {

  private _db: PouchDB.Database;
  
  constructor(name: string) {
    this._db = new PouchDB(name);
  }

}