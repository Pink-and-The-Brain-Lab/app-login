import { Component, OnDestroy, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { API_PATH } from 'src/app/constants/api-path';
import { ITokenValidation } from '../reset-password-code-validation/models/token-validation.interface';

@Component({
  selector: 'app-sign-up-code-validation',
  templateUrl: './sign-up-code-validation.component.html',
  styleUrls: ['./sign-up-code-validation.component.scss']
})
export class SignUpCodeValidationComponent extends HandleError implements OnDestroy {

  private readonly genericCRUDService = inject(GenericCRUDService);
  private destroy$ = new Subject<boolean>();
  email = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
  ) {
    super();
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validate(code: string) {
    this.isLoading = true;
    const token: ITokenValidation = {
      token: code
    };

    this.genericCRUDService.genericPost<string, ITokenValidation>(API_PATH.tokenValidation, token)
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
    this.genericCRUDService.genericPost<string, string>(API_PATH.generateNewToken, this.email)
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
