import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResetPasswordCodeValidationService } from './service/reset-password-code-validation.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IHandleError } from 'src/app/commons/handle-error.interface';

@Component({
  selector: 'app-reset-password-code-validation',
  templateUrl: './reset-password-code-validation.component.html',
  styleUrls: ['./reset-password-code-validation.component.scss']
})
export class ResetPasswordCodeValidationComponent implements OnDestroy, IHandleError {

  private destroy$ = new Subject<boolean>();
  isLoading = false;
  email = '';

  constructor(
    private router: Router,
    private resetPasswordCodeValidationService: ResetPasswordCodeValidationService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validate(code: string) {
    this.isLoading = true;
    
    this.resetPasswordCodeValidationService.validate(code)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          this.router.navigate(['login/new-password', this.email], { skipLocationChange: true, });
        },
        error: _error => this.handleError(_error),
      });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.toast.error(error.error.message);
  }

  back() {
    this.router.navigate(['login/reset-password'], { skipLocationChange: true, });
  }
}
