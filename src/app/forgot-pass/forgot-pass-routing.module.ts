import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPassPage } from './forgot-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPassPageRoutingModule {}
