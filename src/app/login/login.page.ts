import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { SessionService } from '../services/session.service';
import { StorageService } from '../services/storage.service';
import { matchValidation } from '../utils/match-validation';

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

  constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private storageService: StorageService) {
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

  async attemptLogin() {
    console.log('Form Validness: ', this.formLogin.valid);
    if (this.formLogin.valid) {
      const email = this.formLogin.value.email;
      const password = this.formLogin.value.password;
      const data = await this.storageService.getAt('users', email);
      if (data != null && data.password === password) {
        this.sessionService.logIn(data);
        return;
      }
    }
    alert('Invalid Login');
  }

}
