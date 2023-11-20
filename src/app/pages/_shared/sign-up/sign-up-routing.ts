import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{
  path: '',
  component: SignUpComponent
}, {
  path: 'code-validation/:email',
  loadChildren: () => import('../sign-up-code-validation/sign-up-code-validation.module').then(m => m.SignUpCodeValidationModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
