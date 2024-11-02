import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SignUpCodeValidationComponent } from './sign-up-code-validation.component';
import { CodeValidationModule } from 'millez-web-components/dist/components';
import { SignUpCodeValidationIllustrationModule } from 'src/app/illustrations/sign-up-code-validation-illustration/sign-up-code-validation-illustration.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SignUpCodeValidationComponent', () => {
  let component: SignUpCodeValidationComponent;
  let fixture: ComponentFixture<SignUpCodeValidationComponent>;
  let service: jasmine.SpyObj<GenericCRUDService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GenericCRUDService', ['validate', 'genericPost']);
    await TestBed.configureTestingModule({
    declarations: [SignUpCodeValidationComponent],
    imports: [SignUpCodeValidationIllustrationModule,
        CodeValidationModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot()],
    providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: GenericCRUDService, useValue: spy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(SignUpCodeValidationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GenericCRUDService) as jasmine.SpyObj<GenericCRUDService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit code validation', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    service.genericPost.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.validate('1234');
    service.genericPost('1234').subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalledWith(['login'], { skipLocationChange: true, });
      },
    });
  }));

  it('should handle error and show toastr', () => {
    const toastr = TestBed.inject(ToastrService);
    const spy = spyOn(toastr, 'error');
    component.handleError(HTTP_ERROR_RESPONSE);
    expect(component.isLoading).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

  it('should submit new code validation', fakeAsync(() => {
    const toast = TestBed.inject(ToastrService);
    const spy = spyOn(toast, 'success');
    service.genericPost.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.generateNewToken();
    service.genericPost('email@mail.com').subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalledWith('Code generated', 'Success');
      },
    });
  }));
});
