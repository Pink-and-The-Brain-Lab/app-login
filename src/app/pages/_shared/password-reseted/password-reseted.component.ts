import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-password-reseted',
    templateUrl: './password-reseted.component.html',
    styleUrls: ['./password-reseted.component.scss'],
    standalone: false
})
export class PasswordResetedComponent {

  private readonly router = inject(Router);

  goToLogin() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }

}
