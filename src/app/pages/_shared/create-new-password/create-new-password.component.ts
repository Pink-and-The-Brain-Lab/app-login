import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPasswordEvent } from 'millez-components-lib/components/lib/create-password/models/password-event';
import { Subject, takeUntil } from 'rxjs';
import { CreateNewPasswordService } from './service/create-new-password.service';
import { ToastrService } from 'ngx-toastr';
import { IResetInterface } from './models/reset-password.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { HandleError } from 'src/app/commons/handle-error/handle-error';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss']
})
export class CreateNewPasswordComponent extends HandleError implements OnDestroy {

  @ViewChild('button', { static: true }) resetButton: ElementRef = {} as ElementRef;
  private destroy$ = new Subject<boolean>();
  isPasswordValid = false;
  private password = '';
  private confirmPassword = '';
  email = '';

  constructor(
    private router: Router,
    private createNewPasswordService: CreateNewPasswordService,
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
