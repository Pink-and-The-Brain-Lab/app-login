import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ResetPasswordCodeValidationComponent } from './reset-password-code-validation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingButtonModule, SpinnerModule, CodeValidationModule } from 'millez-web-components/dist/components';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ResetPasswordCodeValidationIllustrationModule } from 'src/app/illustrations/reset-password-code-validation-illustration/reset-password-code-validation-illustration.module';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';

describe('ResetPasswordCodeValidationComponent', () => {
  let component: ResetPasswordCodeValidationComponent;
  let fixture: ComponentFixture<ResetPasswordCodeValidationComponent>;
  let service: jasmine.SpyObj<GenericCRUDService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GenericCRUDService', ['genericPost']);
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordCodeValidationComponent ],
      imports: [
        ResetPasswordCodeValidationIllustrationModule,
        ButtonModule,
        LoadingButtonModule,
        SpinnerModule,
        CodeValidationModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: GenericCRUDService, useValue: spy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordCodeValidationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GenericCRUDService) as jasmine.SpyObj<GenericCRUDService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to reset password', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['login/reset-password'], { skipLocationChange: true, });
  });

  it('should validate code', fakeAsync(() => {
    const email = 'email@mail.com';
    component.email = email;
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    service.genericPost.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.validate('123456');
    service.genericPost('').subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalledWith(['login/new-password', email], { skipLocationChange: true, });
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
});
