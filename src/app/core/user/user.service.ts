import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/users';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupérer les informations d'un candidat par son ID
  getCandidateById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Mettre à jour les informations d'un candidat
  updateCandidate(id: number, userData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      userData,
      { headers: this.getAuthHeaders() }
    );
  }

  // Obtenir l'ID de l'utilisateur actuellement connecté
  getCurrentUserId(): number | null {
    // Exemple - à adapter selon votre système d'authentification
    const user = this.authService.getCurrentUser();
    return user ? user.id : null;
  }
}
