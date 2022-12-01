import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      { type: 'required', message: 'É obrigatório confirmar senha.' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 6 caracteres.' },
      { type: 'maxlength', message: 'A senha deve ter no máximo 8 caractéres.' }
    ]
  };

  constructor(private formBuilder: FormBuilder) {
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
  }

}
