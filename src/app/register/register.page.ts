/* eslint-disable object-shorthand */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';
import { matchValidation } from '../utils/match-validation';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formRegister: FormGroup;
  user: User = new User();

  errorMessages = {
    name: [
      { type: 'required', message: 'O campo Nome é obrigatório.' },
      {
        type: 'minlength',
        message: 'O nome deve ter pelo menos 3 caractéres.',
      },
    ],
    cpf: [
      { type: 'required', message: 'O campo CPF é obrigatório.' },
      { type: 'invalido', message: 'CPF Inválido.' },
    ],
    email: [
      { type: 'required', message: 'O campo E-mail é obrigatório.' },
      { type: 'email', message: 'E-mail Inválido.' },
    ],
    password: [
      { type: 'required', message: 'É obrigatório confirmar senha.' },
      {
        type: 'minlength',
        message: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'A senha deve ter no máximo 40 caractéres.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'É obrigatório confirmar senha.' },
      {
        type: 'minlength',
        message: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'A senha deve ter no máximo 40 caractéres.',
      },
      { type: 'match', message: 'As senhas devem ser iguais.' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastController: ToastController,
    private route: Router
  ) {
    this.formRegister = this.formBuilder.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ]),
        ],
        cpf: [
          '',
          Validators.compose([Validators.required]), //, CPFValidator.valid]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ]),
        ],
        confirmPassword: ['',
         Validators.compose([Validators.required])
        ],
      },
      {
        validator: matchValidation('password', 'confirmPassword'),
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
    if (this.formRegister.valid) {
      this.user.name = this.formRegister.value.name;
      this.user.cpf = this.formRegister.value.cpf;
      this.user.email = this.formRegister.value.email;
      this.user.password = this.formRegister.value.password;
      await this.storageService.set(this.user.email, this.user);
      this.notifyToast('Usuário registrado com sucesso.');
      this.route.navigateByUrl('/home');
      return;
    }

    this.notifyToast('Formulário inválido');
  }
}
