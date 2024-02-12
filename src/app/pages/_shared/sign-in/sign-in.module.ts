import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SigninRoutingModule } from './sign-in-routing';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputValidationModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ButtonModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ]
})
export class SignInModule { }
