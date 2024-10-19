import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRoutingModule } from './pages/login/login-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { DashboardVisualizationControlState } from 'millez-web-components/dist/components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
			maxOpened: 10,
			preventDuplicates: true,
			progressBar: true
		}),
    NgxsModule.forRoot([
      DashboardVisualizationControlState,
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
