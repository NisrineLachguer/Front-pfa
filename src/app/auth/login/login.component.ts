import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,         // <-- Add this first
    ReactiveFormsModule,  // <-- Then other Angular modules
    RouterModule,
    FontAwesomeModule

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;
  showErrorAlert = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private showError(message: string): void {
    this.error = message;
    this.showErrorAlert = true;
    timer(5000).subscribe(() => this.showErrorAlert = false);
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.showErrorAlert = false;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => this.redirectBasedOnRole(),
      error: (error) => this.handleLoginError(error)
    });
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.showError('Erreur de récupération du profil');
      return;
    }

    switch(user.role) {
      case 'ADMIN': this.router.navigate(['/admin']); break;
      case 'RECRUITER': this.router.navigate(['/recruiter/offres']); break;
      case 'CANDIDATE': this.router.navigate(['/candidate/offres']); break;
      default: this.router.navigate(['/']);
    }
  }

  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.showError('Email ou mot de passe incorrect');
    } else if (error.status === 0) {
      this.showError('Service indisponible');
    } else {
      this.showError('Cet utilisateur n\'existe pas');
    }
  }
}
