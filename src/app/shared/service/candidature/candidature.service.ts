import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService} from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/api/v1/candidatures';
  private candidatureApiUrl = 'http://localhost:8080/api/candidature';

  constructor(
    private http: HttpClient,
    private router: Router ,
    private authService: AuthService,
  ) { }

  /**
   * Soumet une nouvelle candidature
   * @param formData Les données du formulaire de candidature
   */
  submitApplication(formData: any): Observable<any> {
    // Utilise l'endpoint API correct pour les candidatures
    return this.http.post<any>(`${this.candidatureApiUrl}/apply`, formData)
      .pipe(
        tap(response => {
          console.log('Candidature soumise avec succès:', response);
        })
      );
  }

  /**
   * Récupère les candidatures du candidat connecté
   */
  getMesCandidatures(): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Utilisateur non connecté');
    }
    return this.http.get<any>(`${this.apiUrl}/candidate/${currentUser.id}`);
  }

  /**
   * Récupère les candidatures d'un candidat spécifique
   * @param candidatId L'ID du candidat
   */
  getCandidaturesByCandidat(candidatId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidate/${candidatId}`);
  }

  /**
   * Récupère une candidature par son ID
   * @param id L'ID de la candidature
   */
  getCandidatureById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les détails complets d'une candidature
   * @param id L'ID de la candidature
   */
  getCandidatureDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${id}`);
  }

  /**
   * Supprime une candidature
   * @param id L'ID de la candidature à supprimer
   */
  deleteCandidature(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Télécharge le CV d'une candidature
   * @param id L'ID de la candidature
   */
  downloadCV(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/cv`, {
      responseType: 'blob'
    });
  }
}
