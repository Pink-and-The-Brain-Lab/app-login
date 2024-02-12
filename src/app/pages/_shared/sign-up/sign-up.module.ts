import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignupRoutingModule } from './sign-up-routing';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CheckboxModule, CreatePasswordModule, InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ButtonModule,
    InputValidationModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingButtonModule,
    SpinnerModule,
    CreatePasswordModule,
    CheckboxModule,
    TranslateModule.forChild(),
  ],
  providers: [
    TranslatePipe,
  ]
})
export class SignUpModule { }
