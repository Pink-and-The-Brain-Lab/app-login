import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPasswordComponent } from './sign-in-password.component';
import { SigninPasswordRoutingModule } from './sign-in-password-routing';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CheckboxModule, InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassworIllustrationdModule } from 'src/app/illustrations/password-illustration/password-illustration.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignInPasswordComponent
  ],
  imports: [
    CommonModule,
    SigninPasswordRoutingModule,
    PassworIllustrationdModule,
    ButtonModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingButtonModule,
    SpinnerModule,
    CheckboxModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class SignInPasswordModule { }
