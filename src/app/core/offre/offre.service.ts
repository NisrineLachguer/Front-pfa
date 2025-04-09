import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';



interface Offre {
  id: number;
  nomEntreprise: string;
  posteTitre: string;
  description: string;
  localisation: string;
  datePublication: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/v1/offres';

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getOffresByRecruteur(recruteurId: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/recruteur/${recruteurId}`,
      { headers: this.getAuthHeaders() }
    );
  }


  createOffre(offreData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/`,
      offreData,
      { headers: this.getAuthHeaders() }
    );
  }

  getOffres(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    );
  }

  // Dans offre.service.ts
  getOffresForCandidat(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/`, {
      headers: this.getAuthHeaders()
    });
  }
  getOffre(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateOffre(id: number, offreData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      offreData,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteOffre(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateOffreStatus(id: number, status: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      { status },
      { headers: this.getAuthHeaders() }
    );
  }
}
