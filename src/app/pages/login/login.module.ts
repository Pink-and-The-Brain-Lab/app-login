import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CustomSelectModule, I18N_CONFIG, LogoModule } from 'millez-components-lib/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LogoModule,
    CustomSelectModule,
    TranslateModule.forRoot(I18N_CONFIG)
  ],
  providers: [
    TranslatePipe
  ]
})
export class LoginModule { }
