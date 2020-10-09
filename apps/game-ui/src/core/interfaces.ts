import { IObservableArray } from 'mobx';
import { DB } from './db';

export interface GameModel {
  id: string;
  title: string;
  picture: Blob;
  audio: Blob
}

export interface Game {
  id: string;
  title: string;
  picture: string;
  audio: string
}

export interface Store {
  userName?: string;
  db: DB;
  games: IObservableArray<Game>;
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
    img: DocAttachment,
    sfx: DocAttachment,
  }
}