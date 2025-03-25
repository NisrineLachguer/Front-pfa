import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login({
      username: this.f['username'].value,
      password: this.f['password'].value
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.redirectBasedOnRole();
      },
      error: (error) => {
        this.loading = false;
        this.handleLoginError(error);
      }
    });
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.error = 'Erreur lors de la récupération des informations utilisateur';
      return;
    }

    switch(user.role) {
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'RECRUITER':
        this.router.navigate(['/recruiter/offers']);
        break;
      case 'CANDIDATE':
        this.router.navigate(['/candidate/profile']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
    } else if (error.status === 0) {
      this.error = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
    } else {
      this.error = 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.';
    }
  }
}
