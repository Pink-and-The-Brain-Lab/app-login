import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignUpService } from './service/sign-up.service';
import { ISignup } from './models/signup.interface';
import { ToastrService } from 'ngx-toastr';
import { IPasswordEvent } from 'millez-components-lib/components/lib/create-password/models/password-event';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends HandleError implements OnDestroy {

  @ViewChild('button', { static: true }) resetButton: ElementRef = {} as ElementRef;
  private destroy$ = new Subject<boolean>();
  isPasswordValid = false;
  private password = '';
  private confirmPassword = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    comunicateNotifications: new FormControl(false),
    recieveInformation: new FormControl(true),
  });

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    protected toast: ToastrService,
    protected translatePipe: TranslatePipe,
  ) {
    super(toast, translatePipe);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validatePassword(value: boolean) {
    this.isPasswordValid = value;
  };

  createAccount() {
    this.isLoading = true;
    const data: ISignup = {
      email: this.email?.value,
      name: this.name?.value,
      password: this.password,
      confirmPassword: this.confirmPassword,
      allowZellimCommunicate: this.comunicateNotifications,
      recieveInformation: this.recieveInformation,
    };

    this.signUpService.signUp(data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['login/sign-up/code-validation', this.email?.value], { skipLocationChange: true, });
        },
        error: _error => super.handleError(_error),
      });
  }

  submit() {
    this.resetButton.nativeElement.click();
  }

  login() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }

  updatePassword(pass: IPasswordEvent) {
    this.password = pass.password;
    this.confirmPassword = pass.confirmPassword;
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get comunicateNotifications(): boolean {
    return this.form.get('comunicateNotifications')?.value || false;
  }

  get recieveInformation(): boolean {
    return this.form.get('recieveInformation')?.value || false;
  }

  get isValidInformation(): boolean {
    return !!this.email?.valid && !!this.name?.valid && this.isPasswordValid;
  }

  set comunicateNotifications(value: boolean) {
    this.form.patchValue({
      comunicateNotifications: value
    });
  }

  set recieveInformation(value: boolean) {
    this.form.patchValue({
      recieveInformation: value
    });
  }
}
