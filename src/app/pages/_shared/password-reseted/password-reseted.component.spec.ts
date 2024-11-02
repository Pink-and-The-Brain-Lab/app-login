import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordResetedComponent } from './password-reseted.component';
import { Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import TOASTR_SERVICE_MOCK from 'src/app/mocks/toastr-service.test.mock';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PasswordResetedComponent', () => {
  let component: PasswordResetedComponent;
  let fixture: ComponentFixture<PasswordResetedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PasswordResetedComponent],
    imports: [RouterTestingModule,
        TranslateModule.forRoot()],
    providers: [
        { provide: ToastrService, useValue: TOASTR_SERVICE_MOCK },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.goToLogin();
    expect(spy).toHaveBeenCalledWith(['login'], { skipLocationChange: true, });
  });
});
