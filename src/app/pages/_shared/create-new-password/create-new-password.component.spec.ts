import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CreateNewPasswordComponent } from './create-new-password.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { CreatePasswordModule, InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-web-components/dist/components';
import { Router } from '@angular/router';
import { IPasswordEvent } from 'millez-web-components/dist/components/lib/create-password/models/password-event';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import HTTP_ERROR_RESPONSE from 'src/app/mocks/http-error-response.test.mock';
import SUBSCRIBE_RETURN_MOCK from 'src/app/mocks/subscribe-method.test.mock';
import { CreateNewPasswordIllustrationModule } from 'src/app/illustrations/create-new-password-illustration/create-new-password-illustration.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CreateNewPasswordComponent', () => {
  let component: CreateNewPasswordComponent;
  let fixture: ComponentFixture<CreateNewPasswordComponent>;
  let service: jasmine.SpyObj<GenericCRUDService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GenericCRUDService', ['genericPost']);
    await TestBed.configureTestingModule({
    declarations: [CreateNewPasswordComponent],
    imports: [CreateNewPasswordIllustrationModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        InputValidationModule,
        LoadingButtonModule,
        SpinnerModule,
        CreatePasswordModule,
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

    fixture = TestBed.createComponent(CreateNewPasswordComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GenericCRUDService) as jasmine.SpyObj<GenericCRUDService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get validate password event result', () => {
    component.validatePassword(true);
    expect(component.isPasswordValid).toBeTruthy();
  });

  it('should tigger reset button click', () => {
    const spy = spyOn(component.resetButton.nativeElement, 'click');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set a password', () => {
    component['password'] = '123456';
    expect(component['password']).toBe('123456');
  });

  it('should submit new password', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    service.genericPost.and.returnValue(SUBSCRIBE_RETURN_MOCK);
    component.sendPassword();
    service.genericPost({} as any).subscribe({
      next: () => {
        expect(component.isLoading).toBeFalse();
        expect(spy).toHaveBeenCalledWith(['login/password-reseted'], { skipLocationChange: true, });
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

  it('should update password', () => {
    const data: IPasswordEvent = {
      password: '12345',
      confirmPassword: '12345'
    };
    component.updatePassword(data);
    expect(component['password']).toEqual(data.password);
    expect(component['confirmPassword']).toEqual(data.confirmPassword);
  });
});
