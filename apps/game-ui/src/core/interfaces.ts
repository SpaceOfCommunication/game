import { IObservableArray } from 'mobx';
import { DB } from './db';

export interface GameScreenModel {
  picture: Blob;
  audio: Blob
}

export interface GameModel {
  id: string;
  title: string;
  screens: GameScreenModel[];
}

export interface Store {
  userName?: string;
  db: DB;
  games: IObservableArray<GameModel>;
  isAuthenticated: boolean;
  isInitialized: boolean;
  authorize(userName: string, remotePouchDB: PouchDB.Database): Promise<void>;
  fetchGameModels(): Promise<GameModel[]>;
  initialize(): Promise<void>;
}

export interface DocAttachment {
  content_type: string;
  data: Blob;
}

export interface DocModel {
  title: string;
  _attachments: {
    [key: string]: DocAttachment,
  }
}
