import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguageOption, LocalStorageManager } from 'millez-components-lib/components';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  languageOptions: ILanguageOption[] = [];
  selectedOption: ILanguageOption | null = null;

  constructor(
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.languageOptions = LocalStorageManager.get<ILanguageOption[]>('languageOptions') || [];
    this.getSelectedLanguage();
  }

  private getSelectedLanguage() {
    const selectedLaguage = LocalStorageManager.get<string>('selectedLaguage') || '';

    if (!selectedLaguage.length) {
      this.selectedOption = this.languageOptions[0];
      return;
    }

    const index = this.languageOptions.findIndex(item => item.value === selectedLaguage);
    const languageShouldBe = this.languageOptions[index];
    this.translateService.use(languageShouldBe.value);
    this.selectedOption = languageShouldBe;
  }

  changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
    LocalStorageManager.set<string>('selectedLaguage', language.value);
    this.selectedOption = language;
  }
}
