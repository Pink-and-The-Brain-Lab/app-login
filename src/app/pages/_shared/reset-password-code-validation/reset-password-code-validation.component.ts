import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { API_PATH } from 'src/app/constants/api-path';
import { ITokenValidation } from './models/token-validation.interface';

@Component({
    selector: 'app-reset-password-code-validation',
    templateUrl: './reset-password-code-validation.component.html',
    styleUrls: ['./reset-password-code-validation.component.scss'],
    standalone: false
})
export class ResetPasswordCodeValidationComponent extends HandleError implements OnDestroy {

  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<boolean>();
  email = '';

  constructor() {
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
    
    this.genericCRUDService.genericPost<IDefaultResponse, ITokenValidation>(API_PATH.tokenValidation, token)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.isLoading = false;
          this.router.navigate(['login/new-password', this.email], { skipLocationChange: true, });
        },
        error: _error => super.handleError(_error),
      });
  }

  back() {
    this.router.navigate(['login/reset-password'], { skipLocationChange: true, });
  }
}
