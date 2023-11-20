import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { InputType } from 'src/app/models/input-type';
import { SignInPasswordService } from './service/sign-in-password.service';
import { ISignin } from './models/sign-in.interface';
import { LocalStorageManager } from 'millez-components-lib/components';
import { IUser } from './models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { IHandleError } from 'src/app/commons/handle-error.interface';

@Component({
  selector: 'app-sign-in-password',
  templateUrl: './sign-in-password.component.html',
  styleUrls: ['./sign-in-password.component.scss']
})
export class SignInPasswordComponent implements OnDestroy, IHandleError {

  private destroy$ = new Subject<boolean>();
  isLoading = false;
  inputType: InputType = 'password';
  email = '';

  form = new FormGroup({
    pass: new FormControl('', [Validators.required]),
    stayLoggedIn: new FormControl(false),
  });

  constructor(
    private toast: ToastrService,
    private router: Router,
    private signInPasswordService: SignInPasswordService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get pass(): AbstractControl | null {
    return this.form.get('pass');
  }

  signUp() {
    this.router.navigate(['login/sign-up'], { skipLocationChange: true, });
  }

  login(fromTest = false) {
    this.isLoading = true;
    const data: ISignin = {
      email: this.email,
      password: this.pass?.value,
    };

    this.signInPasswordService.signIn(data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          LocalStorageManager.set<string>('token', _response.token);
          LocalStorageManager.set<IUser>('user', _response.user);
          LocalStorageManager.set<boolean>('stay logged in', !!this.form.get('stayLoggedIn')?.value);
          if (fromTest) return;
          window.location.replace('');
        },
        error: _error => this.handleError(_error),
      });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.toast.error(error.error.message);
  }

  stayLoggedIn(value: boolean) {
    this.form.patchValue({
      stayLoggedIn: value
    });
  }

  togglePasswordVisibility(value: InputType) {
    this.inputType = value;
  }

  back() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }

}
