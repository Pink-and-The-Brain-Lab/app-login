import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputValidationModule, LoadingButtonModule, SpinnerModule } from 'millez-components-lib/components';
import { ButtonModule } from 'src/app/components/button/button.module';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        ButtonModule,
        InputValidationModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingButtonModule,
        SpinnerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get email', () => {
    const email = 'email@mail.com'
    component.form.patchValue({ email });
    const getEmail = component.email?.value;
    expect(getEmail).toBe(email);
  });

  it('should redirect to sign up', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.signUp();
    expect(spy).toHaveBeenCalledWith(['login/sign-up'], { skipLocationChange: true, });
  });

  it('should redirect to password', () => {
    const email = 'email@mail.com'
    component.form.patchValue({ email });
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.goToPassword();
    expect(spy).toHaveBeenCalledWith(['login/password', email], { skipLocationChange: true, });
  });
});
