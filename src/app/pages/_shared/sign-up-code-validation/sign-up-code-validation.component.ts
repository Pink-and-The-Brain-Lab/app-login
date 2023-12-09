import { Component, OnDestroy } from '@angular/core';
import { SignUpCodeValidationService } from './service/sign-up-code-validation.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up-code-validation',
  templateUrl: './sign-up-code-validation.component.html',
  styleUrls: ['./sign-up-code-validation.component.scss']
})
export class SignUpCodeValidationComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  email = '';

  constructor(
    private signUpCodeValidationService: SignUpCodeValidationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected toast: ToastrService,
    protected translatePipe: TranslatePipe,
  ) {
    super(toast, translatePipe);
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
        error: _error => super.handleError(_error),
      });
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
