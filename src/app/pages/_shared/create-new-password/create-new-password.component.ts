import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPasswordEvent } from 'millez-components-lib/components/lib/create-password/models/password-event';
import { Subject, takeUntil } from 'rxjs';
import { CreateNewPasswordService } from './service/create-new-password.service';
import { ToastrService } from 'ngx-toastr';
import { IResetInterface } from './models/reset-password.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { IHandleError } from 'src/app/commons/handle-error.interface';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent implements OnDestroy, IHandleError {

  @ViewChild('button', { static: true }) resetButton: ElementRef = {} as ElementRef;
  private destroy$ = new Subject<boolean>();
  isLoading = false;
  isPasswordValid = false;
  private password = '';
  private confirmPassword = '';
  email = '';

  constructor(
    private router: Router,
    private createNewPasswordService: CreateNewPasswordService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
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

    this.createNewPasswordService.send(data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['login/password-reseted'], { skipLocationChange: true, });
        },
        error: _error => this.handleError(_error),
      });
  }

  handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.toast.error(error.error.message);
  }

  submit() {
    this.resetButton.nativeElement.click();
  }

  updatePassword(pass: IPasswordEvent) {
    this.password = pass.password;
    this.confirmPassword = pass.confirmPassword;
  }
}
