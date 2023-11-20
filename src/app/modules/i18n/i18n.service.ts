import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(
    public translate: TranslateService,
  ) {}

  start() {
    this.translate.addLangs(['en', 'pt', 'es', 'fr']);
    this.translate.setDefaultLang('en');
  }  
}
