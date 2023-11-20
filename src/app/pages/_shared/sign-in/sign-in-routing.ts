import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [{
  path: '',
  component: SignInComponent
}, {
  path: 'password/:email',
  loadChildren: () => import('../sign-in-password/sign-in-password.module').then(m => m.SignInPasswordModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
