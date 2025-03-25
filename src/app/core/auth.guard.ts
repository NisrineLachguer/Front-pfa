import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'];

  // Vérifie si l'utilisateur est connecté et a le bon rôle
  if (authService.isAuthenticated() && authService.hasRole(requiredRole)) {
    return true;
  }

  // Redirige vers /login si non autorisé
  router.navigate(['/login']);
  return false;
};
