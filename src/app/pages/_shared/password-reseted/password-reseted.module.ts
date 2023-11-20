import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetedComponent } from './password-reseted.component';
import { PasswordResetedRoutingModule } from './password-reseted-routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PasswordResetedComponent
  ],
  imports: [
    CommonModule,
    PasswordResetedRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class PasswordResetedModule { }
