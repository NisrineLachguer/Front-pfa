import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/api/candidature';

  constructor(private http: HttpClient) { }

  submitApplication(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/apply`, formData);
  }
}
