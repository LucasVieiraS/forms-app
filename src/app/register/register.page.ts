import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from '../utils/cpf-validation';
import { matchValidation } from '../utils/match-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formRegister: FormGroup;

  errorMessages = {
    name: [
      { type: 'required', message: 'O campo Nome é obrigatório.' },
      { type: 'minlength', message: 'O nome deve ter pelo menos 3 caractéres.' }
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
      { type: 'minlength', message: 'A senha deve ter pelo menos 6 caracteres.' },
      { type: 'maxlength', message: 'A senha deve ter no máximo 8 caractéres.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'É obrigatório confirmar senha.' },
      { type: 'minlength', message: 'A senha deve ter pelo menos 6 caracteres.' },
      { type: 'maxlength', message: 'A senha deve ter no máximo 8 caractéres.' },
      { type: 'match', message: 'Deve ser igual a senha.' }
    ]
  };

  constructor(private formBuilder: FormBuilder) {
    this.formRegister = this.formBuilder.group(
      {
        name: ['', Validators.compose([Validators.required])],
        cpf: [
          '',
          Validators.compose([Validators.required, CpfValidator.valid]),
        ],
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
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchValidation('password', 'confirmPassword'),
      }
    );
  }

  saveRegister() {
    console.log('Form Validness: ', this.formRegister.valid);
  }
}
