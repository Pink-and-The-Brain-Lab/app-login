import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  private readonly router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  signUp() {
    this.router.navigate(['login/sign-up'], { skipLocationChange: true, });
  }

  goToPassword() {
    this.router.navigate(['login/password', this.email?.value], { skipLocationChange: true, });
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }
}
