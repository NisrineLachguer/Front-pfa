import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {catchError} from 'rxjs/operators';

interface Candidature {
  id: number;
  candidatId: number;
  offreId: number;
  statut: string;
  dateCandidature: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  formation: string;
  experience: string;
  competences: string;
  motivation: string;
  disponibilite: string;
  offreTitre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/v1/candidatures'; // Note the 's' at the end
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCandidaturesByRecruteur(recruteurId: number): Observable<Candidature[]> {
    const headers = this.getAuthHeaders();
    console.log('Authorization token:', headers.get('Authorization')); // Debug
    return this.http.get<Candidature[]>(
      `${this.apiUrl}/recruteur/${recruteurId}`,
      { headers }
    );
  }

  downloadCv(candidatureId: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      // Ne pas définir le Content-Type pour les requêtes blob
    });

    console.log(`Requête de téléchargement CV pour ID: ${candidatureId}`);

    return this.http.get(`${this.apiUrl}/${candidatureId}/cv`, {
      headers,
      responseType: 'blob', // Important pour recevoir un fichier binaire
      observe: 'response'
    }).pipe(
      tap(response => {
        console.log('Réponse reçue:', {
          status: response.status,
          contentType: response.headers.get('Content-Type'),
          contentLength: response.body?.size || 0
        });
      }),
      // Extract the blob body from the response
      map((response: any) => {
        if (response.body.size === 0) {
          throw new Error('PDF vide reçu du serveur');
        }
        return response.body;
      }),
      catchError(error => {
        console.error('Erreur lors du téléchargement du CV:', error);
        throw error;
      })
    );
  }

  updateStatus(candidatureId: number, newStatus: string): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log(`Mise à jour du statut pour ID: ${candidatureId}, nouveau statut: ${newStatus}`);

    return this.http.patch(
      `${this.apiUrl}/${candidatureId}/status`,
      { statut: newStatus },
      { headers }
    ).pipe(
      tap(response => {
        console.log('Réponse de mise à jour de statut:', response);
      }),
      catchError(error => {
        console.error('Error updating status:', error);
        throw error;
      })
    );
  }
}
