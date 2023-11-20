import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [{
  path: '',
  component: ResetPasswordComponent
}, {
  path: 'code-validation/:email',
  loadChildren: () => import('../reset-password-code-validation/reset-password-code-validation.module').then(m => m.ResetPasswordCodeValidationModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
