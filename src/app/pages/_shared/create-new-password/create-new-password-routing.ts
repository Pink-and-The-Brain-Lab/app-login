import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewPasswordComponent } from './create-new-password.component';

const routes: Routes = [{
  path: '',
  component: CreateNewPasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewPasswordRoutingModule { }
