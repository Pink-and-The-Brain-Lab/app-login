import { Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPasswordEvent } from 'millez-web-components/dist/components/lib/create-password/models/password-event';
import { Subject, takeUntil } from 'rxjs';
import { IResetInterface } from './models/reset-password.interface';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { API_PATH } from 'src/app/constants/api-path';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent extends HandleError implements OnDestroy {

  @ViewChild('button', { static: true }) resetButton: ElementRef = {} as ElementRef;
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<boolean>();
  isPasswordValid = false;
  private password = '';
  private confirmPassword = '';
  email = '';

  constructor() {
    super();
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validatePassword(value: boolean) {
    this.isPasswordValid = value;
  };

  sendPassword() {
    this.isLoading = true;
    const data: IResetInterface = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.genericCRUDService.genericPost<IDefaultResponse, IResetInterface>(API_PATH.createPassword, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['login/password-reseted'], { skipLocationChange: true, });
        },
        error: _error => super.handleError(_error),
      });
  }

  submit() {
    this.resetButton.nativeElement.click();
  }

  updatePassword(pass: IPasswordEvent) {
    this.password = pass.password;
    this.confirmPassword = pass.confirmPassword;
  }
}
