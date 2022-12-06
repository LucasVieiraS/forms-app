import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  usersList: User[] = [];
  productsList: Product[] = [];

  constructor(private storageService: StorageService, private sessionService: SessionService) { }

  async getUsers() {
    this.usersList = await this.storageService.getAllAt('users');
    console.log(this.usersList);
  }

  async getProducts() {
    this.productsList = await this.storageService.getAllAt('products');
    console.log(this.productsList);
  }

  async removeRegister(email: string) {
    const currentSession = await this.storageService.get('session');
    await this.storageService.removeAt('users', email);
    if (currentSession.email === email) {
      this.sessionService.logOut();
    }
    this.getUsers();
  }

  ionViewDidEnter() {
    this.getUsers();
    this.getProducts();
  }

}
