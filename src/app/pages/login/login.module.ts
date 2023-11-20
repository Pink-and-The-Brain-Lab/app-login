import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CustomSelectModule, LogoModule } from 'millez-components-lib/components';
import { TranslateModule } from '@ngx-translate/core';
import { I18N_CONFIG } from 'src/app/modules/i18n/i18n.config';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LogoModule,
    CustomSelectModule,
    TranslateModule.forRoot(I18N_CONFIG),
  ]
})
export class LoginModule { }
