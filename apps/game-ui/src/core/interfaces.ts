import { IObservableArray, IObservableValue } from 'mobx';
import { DB } from './db';

export interface GameScreenModel {
  picture: Blob;
  audio: Blob
}

export interface GameModel {
  id: string;
  rev: string;
  title: string;
  audioDuration: number;
  screens: GameScreenModel[];
}

export interface Store {
  userName: IObservableValue<string>;
  db: DB;
  games: IObservableArray<GameModel>;
  isAuthenticated: boolean;
  isInitialized: IObservableValue<-1 | 0 | 1>;
  loading: IObservableValue<number>;
  authorize(userName: string, remotePouchDB: PouchDB.Database): Promise<unknown>;
  logout(): Promise<void>;
  fetchGameModels(): Promise<GameModel[]>;
  initialize(): Promise<void>;
  incrementLoading(): void;
  decrementLoading(): void;
}

export interface DocAttachment {
  content_type: string;
  data: Blob;
}

export interface DocModel {
  title: string;
  audioDuration: number;
  _attachments: {
    [key: string]: DocAttachment,
  }
}
