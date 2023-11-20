import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPasswordComponent } from './sign-in-password.component';

const routes: Routes = [{
  path: '',
  component: SignInPasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninPasswordRoutingModule { }
