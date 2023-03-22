import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy{
  usernameContol: FormControl<string | null> = new FormControl('', [
    Validators.required,
  ]);
  passwordControl: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.pattern(''),
  ]);

  loginForm: FormGroup = this.formBuilder.group({
    username: this.usernameContol,
    password: this.passwordControl,
  });

  isLoading = false;
  destroy = new Subject<null>();
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true,
      this.authService
        .onLogin(
          this.usernameContol.value ?? '',
          this.passwordControl.value ?? ''
        )
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (res: any) => {
            if (res?.success) {
              this.loginError = '';
              this.router.navigate(['/book-leave']);
            } else {
              this.loginError = res.message;
              this.loginForm.reset()
            }
            this.isLoading = false;
          },
          error: () => {
            this.loginError = 'Auth call Failed';
            this.isLoading = false
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
