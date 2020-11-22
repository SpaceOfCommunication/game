import { environment } from '../environments/environment';
import { getRemoteDB, getRemoteAuthDB } from './db';


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

  public static async logout(username: string) {
    const pouchDB = getRemoteDB(username);
    return pouchDB.logOut();
  }

  public static async getUserName() {
    const session = await getRemoteAuthDB().getSession();
    return session.userCtx.name;
  }

}