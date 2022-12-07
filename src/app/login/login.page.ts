/* eslint-disable object-shorthand */
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup;

  errorMessages = {
    email: [
      { type: 'required', message: 'O campo E-mail é obrigatório.' },
      { type: 'email', message: 'E-mail Inválido.' },
    ],
    password: [
      { type: 'required', message: 'É obrigatório inserir uma senha.' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 6 caracteres.' },
      { type: 'maxlength', message: 'A senha deve ter no máximo 40 caractéres.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private route: Router,
    private toastController: ToastController
  ) {
    this.formLogin = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
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

  async attemptLogin() {
    if (this.formLogin.valid) {
      const data = await this.storageService.get(this.formLogin.value.email);
      if (data && data.password === this.formLogin.value.password) {
        this.route.navigateByUrl('/home');
        this.notifyToast('Login realizado com sucesso.');
        return;
      }
      this.notifyToast('Formulário inválido');
      return;
    }

  }

}
