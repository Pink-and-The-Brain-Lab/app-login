import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SignInPasswordComponent } from './sign-in-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidationModule, LoadingButtonModule, SpinnerModule, CheckboxModule } from 'millez-web-components/dist/components';
import { ButtonModule } from 'src/app/components/button/button.module';
import { PassworIllustrationdModule } from 'src/app/illustrations/password-illustration/password-illustration.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';

describe('SignInPasswordComponent', () => {
  let component: SignInPasswordComponent;
  let fixture: ComponentFixture<SignInPasswordComponent>;
  let service: jasmine.SpyObj<GenericCRUDService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GenericCRUDService', ['genericPost']);
    await TestBed.configureTestingModule({
      declarations: [ SignInPasswordComponent ],
      imports: [
        PassworIllustrationdModule,
        ButtonModule,
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        CheckboxModule,
        NoopAnimationsModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslatePipe,
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        { provide: GenericCRUDService, useValue: spy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInPasswordComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GenericCRUDService) as jasmine.SpyObj<GenericCRUDService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get password', () => {
    const pass = '123456';
    component.form.patchValue({ pass });
    const getPass = component.pass?.value;
    expect(getPass).toBe(pass);
  });

  it('should redirect to sign up', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.signUp();
    expect(spy).toHaveBeenCalledWith(['login/sign-up'], { skipLocationChange: true, });
  });

  it('should set value to stay logged in', () => {
    component.stayLoggedIn(true);
    const stayLoggedIn = component.form.get('stayLoggedIn')?.value;
    expect(stayLoggedIn).toBeTrue();
  });

  it('should toggle input to typew text', () => {
    component.togglePasswordVisibility('text');
    expect(component.inputType).toBe('text');
  });

  it('shoud redirect to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.back();
    expect(spy).toHaveBeenCalledWith(['login'], { skipLocationChange: true, });
  });

  it('should submit new password', fakeAsync(() => {
    service.genericPost.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.login(true);
    service.genericPost({} as any).subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
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
