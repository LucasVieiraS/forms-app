import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from '../utils/cpf-validation';
import { matchValidation } from '../utils/match-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.valid])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]),
      ],
      confirmPassword: ['', Validators.required],
    }, {
      validator: matchValidation('password', 'confirmPassword')
    });
  }

  ngOnInit() {

  }

  saveRegister() {
    console.log(this.formRegister);
    console.log('Form Validness: ', this.formRegister.valid);
  }

}
