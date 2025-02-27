import { Component, OnDestroy, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { API_PATH } from 'src/app/constants/api-path';
import { IEmail } from './models/email.interface';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: false
})
export class ResetPasswordComponent extends HandleError implements OnDestroy {

  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly router = inject(Router);
  private destroy$ = new Subject<boolean>();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  sendCode() {
    this.isLoading = true;
    const payload: IEmail = {
      email: this.email?.value
    };

    this.genericCRUDService.genericPost<IDefaultResponse, IEmail>(API_PATH.resetPassword, payload)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          this.router.navigate(['login/reset-password/code-validation', this.email?.value], { skipLocationChange: true, });
        },
        error: _error => super.handleError(_error),
      });
  }

  back() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }
}
