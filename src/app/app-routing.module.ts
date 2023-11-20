import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18N_CONFIG } from './modules/i18n/i18n.config';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [{
  path: '',
  loadChildren: async () => (await import('./pages/login/login.module')).LoginModule
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    TranslateModule.forRoot(I18N_CONFIG),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
