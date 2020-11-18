import { makeAutoObservable } from 'mobx';

export interface DialogData { 
  title?: string,
  message?: string,
  onConfim?: () => void,
  onClose?: () => void,
}

export class DialogService {
  static getInstance() {
    if (!DialogService._instance) {
      DialogService._instance = new DialogService();
    }
    return DialogService._instance;
  }
  static _instance: DialogService;

  constructor() {
    makeAutoObservable(this);
  }

  data?: DialogData;

  public showDialog(data: DialogData) {
    this.data = data;
  }

  public closeDialog() {
    this.data = undefined;
  }
}