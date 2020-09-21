import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';

PouchDB.plugin(PouchAuthentication);

export class DB {

  private _db: PouchDB.Database;

  constructor() {
    const userName = 'batman';
    const DBName = `userdb-${this.hexEncode(userName)}`;

    // eslint-disable-next-line @typescript-eslint/camelcase
    this._db = new PouchDB(`http://localhost:5984/${DBName}`, { skip_setup: true });
  }

  public signUp() {
    return
  }

  public login() {
    this._db.logIn('batman', 'brucewayne', function (err, response) {
      if (err) {
        if (err.name === 'unauthorized' || err.name === 'forbidden') {
          console.log("name or password incorrect")
        } else {
          console.log("cosmic rays, a meteor, etc.")
        }
      }
    });
  }

  private hexEncode(text: string) {
    let hex : string;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      hex = text.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }

    return result
  }

}