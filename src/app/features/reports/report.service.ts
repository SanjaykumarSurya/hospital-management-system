import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../shared/models/report.model';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  getByPatient(patientId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/patient/${patientId}`);
  }

  upload(data: FormData): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
