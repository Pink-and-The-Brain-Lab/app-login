import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResetPasswordService } from './service/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IHandleError } from 'src/app/commons/handle-error.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnDestroy, IHandleError {

  private destroy$ = new Subject<boolean>();
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private toast: ToastrService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  sendCode() {
    this.isLoading = true;

    this.resetPasswordService.send(this.email?.value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          this.router.navigate(['login/reset-password/code-validation', this.email?.value], { skipLocationChange: true, });
        },
        error: _error => this.handleError(_error),
      });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.toast.error(error.error.message);
  }

  back() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }
}
