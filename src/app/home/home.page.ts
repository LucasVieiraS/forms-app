/* eslint-disable object-shorthand */
import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  productsList: Product[] = [];

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    private route: Router
    ) { }

  async getProducts() {
    this.productsList = await this.storageService.get('products');
  }

  async notifyToast(message = 'Failed to load') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      icon: 'alert',
      position: 'bottom'
    });

    await toast.present();
  }
  async removeProduct(product: Product) {
    const products = await this.storageService.get('products');
    const index = products.findIndex(prod => prod.name === product.name);
    products.splice(index, 1);

    await this.storageService.set('products', products).then(() => {
      this.getProducts();
      this.notifyToast('Produto deletado com sucesso.');
    });
  }

  ionViewDidEnter() {
    this.getProducts();
  }

}
