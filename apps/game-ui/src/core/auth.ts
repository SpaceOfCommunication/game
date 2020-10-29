import { environment } from '../environments/environment';
import { getRemoteDB, getRemoteDBTEST } from './db';


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
    const  response = await pouchDB.logIn(username, password);
    return {response, pouchDB};
  }

  public static async logout(db: PouchDB.Database) {
    return db.logOut();
  }

  public static async isAuthenticated(username: string) {
    const session = await getRemoteDBTEST().getSession();
    return !!session.userCtx.name;
  }

  public static async getUserName(db: PouchDB.Database) {
    const session = await db.getSession();
    return session.userCtx.name;
  }

}