import { makeAutoObservable } from 'mobx';

export declare type SnackStatus = 'success' | 'error' | 'info';

export interface SnackMessageData { 
  message: string;
  status: SnackStatus;
}

export class MessageService {
  static getInstance() {
    if (!MessageService._instance) {
      MessageService._instance = new MessageService();
    }
    return MessageService._instance;
  }
  static _instance: MessageService;

  data?: SnackMessageData;

  constructor() {
    makeAutoObservable(this);
  }

  public showMessage(data: SnackMessageData) {
    this.data = data;
  }

  public clearMessage() {
    this.data = undefined;
  }
}