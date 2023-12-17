import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ILanguageOption, LocalStorageManager } from 'millez-components-lib/components';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  languageOptions: ILanguageOption[] = [];
  selectedOption: ILanguageOption | null = null;
  private destroy$ = new Subject<boolean>();
  private readonly localStorageManager = inject(LocalStorageManager);
  private readonly translateService = inject(TranslateService);
  private readonly translatePipe = inject(TranslatePipe);

  ngOnInit(): void {
    this.languageOptions = this.localStorageManager.get<ILanguageOption[]>('languageOptions') || [];
    this.getSelectedLanguage();
    this.translateService.onLangChange
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getSelectedLanguage());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getSelectedLanguage() {
    const selectedLaguage = this.localStorageManager.get<string>('selectedLaguage') || '';

    if (!selectedLaguage.length) {
      this.selectedOption = this.languageOptions[0];
      return;
    }

    const index = this.languageOptions.findIndex(item => item.value === selectedLaguage);
    const languageShouldBe = this.translateSelectedOption(this.languageOptions[index]);
    this.translateService.use(languageShouldBe.value);
    this.selectedOption = languageShouldBe;
  }

  changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
    this.localStorageManager.set<string>('selectedLaguage', language.value);
    this.selectedOption = language
    this.selectedOption = this.translateSelectedOption(language);
  }

  private translateSelectedOption(option: ILanguageOption): ILanguageOption {
    return {
      value: option.value,
      label: this.translatePipe.transform(option.label.toUpperCase())
    };
  }
}
