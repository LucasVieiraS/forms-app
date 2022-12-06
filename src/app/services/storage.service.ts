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
  }

  // Util
  public async checkIfKeyEmpty(data: any, key: string) {
    if (data === null) {
      this.set(key, []);
      data = [];
    }
    return data;
  }

  // Main Keys
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    let data;
    await this._storage?.get(key).then((newData: User) => {
      data = this.checkIfKeyEmpty(newData, key);;
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

  // Sub Keys
  public async setAt(id: string, key: string, value: any) {
    const existingData = await this.get(id);
    existingData[key] = value;
    console.log(existingData);
    await this._storage?.set(id, existingData);
  }

  public async getAt(id: string, key: string) {
    let data;
    await this._storage?.get(id).then((newData: User) => {
      data = newData;
    });
    return data[key];
  }

  public async removeAt(id: string, key: string) {
    const existingData = await this.get(id);
    existingData[key] = null;
    await this._storage?.set(id, existingData);
    //this._storage?.remove(key);
  }

  public async getAllAt(id: string) {
    let result: any = await this._storage.forEach((value, key, index) => {
      if (key === id) {
        return value;
      }
    });
    result = result || [];
    return result;
  }
}
