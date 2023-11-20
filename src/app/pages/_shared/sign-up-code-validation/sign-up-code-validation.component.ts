import { Component, OnDestroy } from '@angular/core';
import { SignUpCodeValidationService } from './service/sign-up-code-validation.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IHandleError } from 'src/app/commons/handle-error.interface';

@Component({
  selector: 'app-sign-up-code-validation',
  templateUrl: './sign-up-code-validation.component.html',
  styleUrls: ['./sign-up-code-validation.component.scss']
})
export class SignUpCodeValidationComponent implements OnDestroy, IHandleError {

  private destroy$ = new Subject<boolean>();
  isLoading = false;
  email = '';

  constructor(
    private signUpCodeValidationService: SignUpCodeValidationService,
    private toast: ToastrService,
    private router: Router,
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

    this.signUpCodeValidationService.validate(code)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toast.success('Account created, please log in to continue.', 'Success');
          this.router.navigate(['login'], { skipLocationChange: true, });
        },
        error: _error => this.handleError(_error),
      });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.toast.error(error.error.message);
  }

  generateNewToken() {
    this.signUpCodeValidationService.generateNewToken(this.email)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('Code generated', 'Success');
      },
      error: _error => this.handleError(_error),
    });
  }
}
