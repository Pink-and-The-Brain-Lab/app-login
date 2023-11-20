import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-components-lib/components';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ResetPasswordIllustrationModule } from 'src/app/illustrations/reset-password-illustration/reset-password-illustration.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordService } from './service/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let service: jasmine.SpyObj<ResetPasswordService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ResetPasswordService', ['send']);
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [
        ResetPasswordIllustrationModule,
        ButtonModule,
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: ResetPasswordService, useValue: spy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResetPasswordService) as jasmine.SpyObj<ResetPasswordService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['login'], { skipLocationChange: true, });
  });

  it('should email value', () => {
    const value = 'email@mail.com';
    component.form.patchValue({
      email: value
    });
    const email = component.email?.value;
    expect(email).toBe(value);
  });

  it('should reset password', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    service.send.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.sendCode();
    service.send('').subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalled();
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
