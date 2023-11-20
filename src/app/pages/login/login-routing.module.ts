import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  loadChildren: () => import('../_shared/sign-in/sign-in.module').then(m => m.SignInModule)
}, {
  path: 'reset-password',
  component: LoginComponent,
  loadChildren: () => import('../_shared/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
}, {
  path: 'new-password/:email',
  component: LoginComponent,
  loadChildren: () => import('../_shared/create-new-password/create-new-password.module').then(m => m.CreateNewPasswordModule)
}, {
  path: 'password-reseted',
  component: LoginComponent,
  loadChildren: () => import('../_shared/password-reseted/password-reseted.module').then(m => m.PasswordResetedModule)
}, {
  path: 'sign-up',
  component: LoginComponent,
  loadChildren: () => import('../_shared/sign-up/sign-up.module').then(m => m.SignUpModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
