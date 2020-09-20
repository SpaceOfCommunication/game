import PouchDB from 'pouchdb-browser';
import PouchAuthentication from 'pouchdb-authentication';

PouchDB.plugin(PouchAuthentication);

export class DB {

  private _db: PouchDB.Database;

  constructor() {

    const userName = 'batman';
    const DBName = `userdb-${this.hexEncode(userName)}`;

    
    this._db = new PouchDB(`http://localhost:5984/${DBName}`, {
      // auth: {
      //   username: 'admin',
      //   password: 'admin'
      // },
      // eslint-disable-next-line @typescript-eslint/camelcase
      skip_setup: true 
    });
  }

  public signUp() {
    this._db.signUp('batman', 'brucewayne', function (err, response) {
      if (err) {
        if (err.name === 'conflict') {
          console.log('"batman" already exists, choose another username')
        } else if (err.name === 'forbidden') {
          console.log("invalid username")
        } else {
          console.log("HTTP error, cosmic rays, etc.")
        }
      }
    });
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