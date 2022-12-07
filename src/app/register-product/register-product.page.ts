/* eslint-disable object-shorthand */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../models/Product';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})
export class RegisterProductPage {

  formProduct: FormGroup;
  product: Product = new Product();

  errorMessages = {
    name: [
      { type: 'required', message: 'O campo Nome é obrigatório.' },
      { type: 'minlength', message: 'O nome deve ter pelo menos 3 caractéres.'},
    ],
    description: [
      { type: 'required', message: 'O campo Descrição é obrigatório.' },
      { type: 'invalido', message: 'Descrição Inválida.' },
      { type: 'minlength', message: 'A descrição deve ter pelo menos 3 caractéres.'},
    ],
    price: [
      { type: 'required', message: 'O campo Preço é obrigatório.' },
      { type: 'email', message: 'Preço Inválido.' },
    ],
    validity: [
      { type: 'required', message: 'O campo Validade é obrigatório.' },
      { type: 'email', message: 'Validade Inválido.' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastController: ToastController,
    private route: Router
  ) {
    this.formProduct = this.formBuilder.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ]),
        ],
        description: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5)
          ]),
        ],
        price: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        validity: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
      }
    );
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

  async saveRegister() {
    if (this.formProduct.valid) {
      let products = await this.storageService.get('products');
      if (!products) {
        this.storageService.set('products', []);
        products = [];
      }
      this.product.name = this.formProduct.value.name;
      this.product.description = this.formProduct.value.description;
      this.product.price = this.formProduct.value.price;
      this.product.validity = this.formProduct.value.validity;
      products.push(this.product);
      await this.storageService.set('products', products).then(() => {
        this.notifyToast('Produto registrado com sucesso.');
        this.route.navigateByUrl('/home');
      });
      return;
    }

    this.notifyToast('Formulário inválido');
  }
}
