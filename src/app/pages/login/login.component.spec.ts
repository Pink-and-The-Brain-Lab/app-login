import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ILanguageOption, LocalStorageManager, LogoModule } from 'millez-web-components/dist/components';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

const LANGUAGE_OPTIONS: ILanguageOption[] = [{
  value: 'en',
  label: 'English',
}, {
  value: 'pt',
  label: 'Portuguese',
}, {
  value: 'es',
  label: 'Spanish',
}, {
  value: 'fr',
  label: 'French',
}];

export const TRANSLATE_PIPE_MOCK = {
  transform: () => {
   return 'Español';
  }
 }

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let localStorageManager: LocalStorageManager;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        LogoModule,
        RouterModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: TranslatePipe, useValue: TRANSLATE_PIPE_MOCK }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    localStorageManager = TestBed.inject(LocalStorageManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get language options', () => {
    spyOn(localStorageManager, 'get')
      .withArgs('LANGUAGE_OPTIONS').and.returnValue(LANGUAGE_OPTIONS)
      .withArgs('SELECTED_LAGUAGE').and.returnValue('en');
    component.ngOnInit();
    expect(component.languageOptions.length).toBe(4);
    expect(component.languageOptions[0].value).toBe('en');
  });

  it('should get selected language and set english as a default', () => {
    spyOn(localStorageManager, 'get')
      .withArgs('LANGUAGE_OPTIONS').and.returnValue(LANGUAGE_OPTIONS)
      .withArgs('SELECTED_LAGUAGE').and.returnValue('');
    component.languageOptions = LANGUAGE_OPTIONS;
    component['getSelectedLanguage']();
    expect(component.selectedOption?.value).toBe('en');
  });

  it('should get selected language and set portuguese as a default', () => {
    spyOn(localStorageManager, 'get')
      .withArgs('LANGUAGE_OPTIONS').and.returnValue(LANGUAGE_OPTIONS)
      .withArgs('SELECTED_LAGUAGE').and.returnValue('pt');
    component.languageOptions = LANGUAGE_OPTIONS;
    component['getSelectedLanguage']();
    expect(component.selectedOption?.value).toBe('pt');
  });

  it('should change language to spanish', () => {
    const spy = spyOn(localStorageManager, 'set');
    component.changeLanguage(LANGUAGE_OPTIONS[2]);
    expect(spy).toHaveBeenCalledWith('SELECTED_LAGUAGE', LANGUAGE_OPTIONS[2].value);
  });

  it('should translate laguage option label', () => {
    component['translateService'].use(LANGUAGE_OPTIONS[2].value);
    const translatedOption = component['translateSelectedOption'](LANGUAGE_OPTIONS[2]);
    expect(translatedOption.label).toBe('Español');
  });
});
