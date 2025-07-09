import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../shared/models/patient.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
   providedIn: 'root' 
  })
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {}

  getAll(params: { skip?: number, limit?: number } = {}): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }

  getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(data: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, data);
  }

  update(id: string, data: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
