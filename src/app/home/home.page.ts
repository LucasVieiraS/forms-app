import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  usersList: User[] = [];

  constructor(private storageService: StorageService) { }

  async getUsers() {
    this.usersList = await this.storageService.getAll();
  }

  async removeRegister(email: string) {
    await this.storageService.remove(email);
    this.getUsers();
  }

  ionViewWillEnter() {
    this.getUsers();
  }

}
