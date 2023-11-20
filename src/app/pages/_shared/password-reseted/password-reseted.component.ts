import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reseted',
  templateUrl: './password-reseted.component.html',
  styleUrls: ['./password-reseted.component.scss']
})
export class PasswordResetedComponent {

  constructor(
    private router: Router,
  ) {}

  goToLogin() {
    this.router.navigate(['login'], { skipLocationChange: true, });
  }

}
