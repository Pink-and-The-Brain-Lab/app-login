import { Component, OnDestroy } from '@angular/core';
import { ILanguageOption } from './models/language-option.model';
import { TranslateService } from '@ngx-translate/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  languageOptions: ILanguageOption[] = [];
  selectedOption: ILanguageOption | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(
    public translate: TranslateService,
  ) {
    this.buildLanguageOptions();

    this.translate.onLangChange
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.buildLanguageOptions();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private buildLanguageOptions() {
    const ENGLISH =  this.translate.get('ENGLISH');
    const PORTUGUESE = this.translate.get('PORTUGUESE');
    const SPANISH = this.translate.get('SPANISH');
    const FRENCH = this.translate.get('FRENCH');

    forkJoin([
      ENGLISH,
      PORTUGUESE,
      SPANISH,
      FRENCH
    ]).subscribe(
      _response => {
        this.languageOptions = [{
          value: 'en',
          label: _response[0],
        }, {
          value: 'pt',
          label: _response[1],
        }, {
          value: 'es',
          label: _response[2],
        }, {
          value: 'fr',
          label: _response[3],
        }];

        this.selectedOption = this.selectedOption || this.languageOptions[0];
      }
    );
  }

  getSelectedLanguage(language: ILanguageOption) {
    this.translate.use(language.value);
    const index = this.languageOptions.findIndex(item => item.value === language.value || 0)
    this.selectedOption = this.languageOptions[index];
  }
}
