import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordCodeValidationComponent } from './reset-password-code-validation.component';

const routes: Routes = [{
  path: '',
  component: ResetPasswordCodeValidationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordCodeValidationRoutingModule { }
