/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log(this.getAll());
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    let data;
    await this._storage?.get(key).then((newData: User) => {
      data = newData;
    });
    return data;
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public getAll() {
    const list = [];
    this._storage.forEach((key, value, index) => {
      list.push(key);
    });
    return list;
  }
}
