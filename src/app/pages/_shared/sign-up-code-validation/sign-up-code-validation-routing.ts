import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpCodeValidationComponent } from './sign-up-code-validation.component';

const routes: Routes = [{
  path: '',
  component: SignUpCodeValidationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupCodeValidationRoutingModule { }
