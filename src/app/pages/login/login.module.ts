import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CustomSelectModule, DashboardVisualizationControlState, I18N_CONFIG, LogoModule } from 'millez-web-components/dist/components';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';

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
    NgxsModule.forRoot([
      DashboardVisualizationControlState,
    ]),
  ],
  providers: [
    TranslatePipe,
    Store,
  ]
})
export class LoginModule { }
