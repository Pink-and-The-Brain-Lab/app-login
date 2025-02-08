import { Component, OnDestroy, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ISignin } from './models/sign-in.interface';
import { LocalStorageManager, Storage } from 'millez-web-components/dist/components';
import { IUser } from './models/user.interface';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { ISigninResponse } from './models/sign-in-response.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { InputType } from 'src/app/commons/models/input-type';

@Component({
    selector: 'app-sign-in-password',
    templateUrl: './sign-in-password.component.html',
    styleUrls: ['./sign-in-password.component.scss'],
    standalone: false
})
export class SignInPasswordComponent extends HandleError implements OnDestroy {

  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly localStorageManager = inject(LocalStorageManager);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<boolean>();
  inputType: InputType = 'password';
  email = '';

  form = new FormGroup({
    pass: new FormControl('', [Validators.required]),
    stayLoggedIn: new FormControl(false),
  });

  constructor() {
    super();
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

    this.genericCRUDService.genericPost<ISigninResponse, ISignin>(API_PATH.signIn, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          this.localStorageManager.set<string>(Storage.TOKEN, _response.token);
          this.localStorageManager.set<IUser>(Storage.USER, _response.user);
          this.localStorageManager.set<boolean>(Storage.STAY_LOGGED_IN, !!this.form.get('stayLoggedIn')?.value);
          if (fromTest) return;
          window.location.replace('');
        },
        error: _error => super.handleError(_error),
      });
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
