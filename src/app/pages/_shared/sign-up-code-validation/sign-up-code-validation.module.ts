import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpCodeValidationComponent } from './sign-up-code-validation.component';
import { SignupCodeValidationRoutingModule } from './sign-up-code-validation-routing';
import { SignUpCodeValidationIllustrationModule } from 'src/app/illustrations/sign-up-code-validation-illustration/sign-up-code-validation-illustration.module';
import { CodeValidationModule } from 'millez-components-lib/components';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignUpCodeValidationComponent
  ],
  imports: [
    CommonModule,
    SignupCodeValidationRoutingModule,
    SignUpCodeValidationIllustrationModule,
    CodeValidationModule,
    TranslateModule.forChild(),
  ]
})
export class SignUpCodeValidationModule { }
