import { environment } from '../environments/environment';
import { getRemoteDB } from './db';


export class Auth {
  
  public static signUp(username: string, password: string) {
    return fetch(`${environment.apiPath}/user-create`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }

  public static async login(username: string, password: string) {
    const pouchDB = getRemoteDB(username);
    await pouchDB.logIn(username, password);
    return pouchDB;
    
    // function (err, response) {
    //   if (err) {
    //     if (err.name === 'unauthorized' || err.name === 'forbidden') {
    //       console.error("name or password incorrect")
    //     } else {
    //       console.error("cosmic rays, a meteor, etc.")
    //     }
    //   }
    // }
  }

  public static async logout(db: PouchDB.Database) {
    return db.logOut();
  }

}