import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordIllustrationModule } from 'src/app/illustrations/reset-password-illustration/reset-password-illustration.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ResetPasswordIllustrationModule,
    ButtonModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingButtonModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class ResetPasswordModule { }
