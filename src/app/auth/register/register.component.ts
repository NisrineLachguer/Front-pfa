import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../auth.service';
import {MustMatch} from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,


  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;
  private errorTimeout: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.clearError();

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const userData = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: this.f['role'].value
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/login'], {
          queryParams: { registered: true }
        });
      },
      error: (error) => {
        this.loading = false;
        this.handleRegistrationError(error);
      }
    });
  }

  private handleRegistrationError(error: any): void {
     if (error.status === 0) {
      this.setErrorWithTimeout('Erreur de connexion au serveur');
    } else {
      this.setErrorWithTimeout('Email déjà exists.');
    }
  }

  private setErrorWithTimeout(message: string, timeout: number = 5000): void {
    this.clearError();
    this.error = message;
    this.errorTimeout = setTimeout(() => {
      this.error = '';
    }, timeout);
  }

  private clearError(): void {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    this.error = '';
  }

  ngOnDestroy(): void {
    this.clearError();
  }
}
