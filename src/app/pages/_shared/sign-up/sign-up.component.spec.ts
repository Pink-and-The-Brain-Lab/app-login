import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputValidationModule, LoadingButtonModule, SpinnerModule, CreatePasswordModule, CheckboxModule } from 'millez-components-lib/components';
import { ButtonModule } from 'src/app/components/button/button.module';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpService } from './service/sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { IPasswordEvent } from 'millez-components-lib/components/lib/create-password/models/password-event';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let service: jasmine.SpyObj<SignUpService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SignUpService', ['signUp']);
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        ButtonModule,
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        CreatePasswordModule,
        CheckboxModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: SignUpService, useValue: spy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SignUpService) as jasmine.SpyObj<SignUpService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set if password is valid', () => {
    component.validatePassword(true);
    expect(component.isPasswordValid).toBeTrue();
  });

  it('should trigger submit button', () => {
    const spy = spyOn(component.resetButton.nativeElement, 'click');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should redirect to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.login();
    expect(spy).toHaveBeenCalledWith(['login'], { skipLocationChange: true, });
  });

  it('should get email', () => {
    const email = 'email@mail.com';
    component.form.patchValue({ email });
    const getEmail = component.email?.value;
    expect(getEmail).toBe(email);
  });

  it('should get name', () => {
    const name = 'andre';
    component.form.patchValue({ name });
    const getname = component.name?.value;
    expect(getname).toBe(name);
  });

  it('should get comunicateNotifications', () => {
    const comunicateNotifications = true;
    component.form.patchValue({ comunicateNotifications });
    const getcomunicateNotifications = component.comunicateNotifications;
    expect(getcomunicateNotifications).toBe(comunicateNotifications);
  });

  it('should get recieveInformation', () => {
    const recieveInformation = true;
    component.form.patchValue({ recieveInformation });
    const getrecieveInformation = component.recieveInformation;
    expect(getrecieveInformation).toBe(recieveInformation);
  });

  it('should get is valid information', () => {
    component.validatePassword(true);
    component.form.patchValue({
      email: 'mail@mail.com',
      name: 'andre da silva sauro',
    });
    expect(component.isValidInformation).toBeTrue();
  });

  it('should get isnt valid information when password is invalid', () => {
    component.validatePassword(false);
    component.form.patchValue({
      email: 'mail@mail.com',
      name: 'andre da silva sauro',
    });
    expect(component.isValidInformation).toBeFalse();
  });

  it('should set password', () => {
    const password = '123456';
    component['password'] = password;
    expect(component['password']).toBe(password);
  });

  it('should set comunicate notifications', () => {
    component.comunicateNotifications = true;
    expect(component.comunicateNotifications).toBeTrue();
  });

  it('should set recieve information', () => {
    component.recieveInformation = true;
    expect(component.recieveInformation).toBeTrue();
  });

  it('should submit new password', fakeAsync(() => {
    const email = 'email@mail.com';
    component.form.patchValue({ email })
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    service.signUp.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.createAccount();
    service.signUp({} as any).subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalledWith(['login/sign-up/code-validation', email], { skipLocationChange: true, });
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

  it('should update password data', () => {
    const data: IPasswordEvent = {
      password: '123456',
      confirmPassword: '123456',
    };
    component.updatePassword(data);
    expect(component['password']).toBe(data.password);
    expect(component['confirmPassword']).toBe(data.confirmPassword);
  });
});
