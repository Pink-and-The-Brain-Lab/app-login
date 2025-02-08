import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DashboardVisualizationControlAction, ILanguageOption, LocalStorageManager, Storage } from 'millez-web-components/dist/components';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
  
  languageOptions: ILanguageOption[] = [];
  selectedOption: ILanguageOption | null = null;
  private destroy$ = new Subject<boolean>();
  private readonly localStorageManager = inject(LocalStorageManager);
  private readonly translateService = inject(TranslateService);
  private readonly translatePipe = inject(TranslatePipe);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch( new DashboardVisualizationControlAction({ showDashboard: false }) );
    this.languageOptions = this.localStorageManager.get<ILanguageOption[]>(Storage.LANGUAGE_OPTIONS) || [];
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
    const selectedLaguage = this.localStorageManager.get<string>(Storage.SELECTED_LAGUAGE) || '';

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
    this.localStorageManager.set<string>(Storage.SELECTED_LAGUAGE, language.value);
    this.selectedOption = this.translateSelectedOption(language);
  }

  private translateSelectedOption(option: ILanguageOption): ILanguageOption {
    return {
      value: option.value,
      label: this.translatePipe.transform(option.label.toUpperCase())
    };
  }
}
