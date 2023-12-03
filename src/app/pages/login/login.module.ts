import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CustomSelectModule, LogoModule } from 'millez-components-lib/components';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LogoModule,
    CustomSelectModule,
  ]
})
export class LoginModule { }
