import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordCodeValidationComponent } from './reset-password-code-validation.component';
import { ResetPasswordCodeValidationRoutingModule } from './reset-password-code-validation-routing';
import { ResetPasswordCodeValidationIllustrationModule } from 'src/app/illustrations/reset-password-code-validation-illustration/reset-password-code-validation-illustration.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CodeValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-components-lib/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResetPasswordCodeValidationComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordCodeValidationRoutingModule,
    ResetPasswordCodeValidationIllustrationModule,
    ButtonModule,
    LoadingButtonModule,
    SpinnerModule,
    CodeValidationModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ResetPasswordCodeValidationModule { }
