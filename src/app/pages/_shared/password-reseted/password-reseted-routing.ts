import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetedComponent } from './password-reseted.component';

const routes: Routes = [{
  path: '',
  component: PasswordResetedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetedRoutingModule { }
