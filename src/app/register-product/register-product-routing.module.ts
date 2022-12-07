import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterProductPage } from './register-product.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterProductPageRoutingModule {}
