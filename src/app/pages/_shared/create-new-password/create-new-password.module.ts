import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewPasswordComponent } from './create-new-password.component';
import { CreateNewPasswordRoutingModule } from './create-new-password-routing';
import { CreatePasswordModule, InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-components-lib/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNewPasswordIllustrationModule } from 'src/app/illustrations/create-new-password-illustration/create-new-password-illustration.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateNewPasswordComponent
  ],
  imports: [
    CommonModule,
    CreateNewPasswordRoutingModule,
    CreateNewPasswordIllustrationModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingButtonModule,
    SpinnerModule,
    CreatePasswordModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class CreateNewPasswordModule { }
