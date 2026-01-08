import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
}];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppRoutingModule { }
