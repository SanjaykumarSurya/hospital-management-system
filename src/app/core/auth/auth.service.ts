// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment.development';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private baseUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.baseUrl}/auth/login`, credentials)
//   }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';  // ✅ Correct import

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getRole(): string | null {
  const token = this.getToken(); // from localStorage
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    console.log('Decoded token:', decoded); // ✅ DEBUG
    return decoded.role;
  } catch (e) {
    console.error('Token decode failed:', e);
    return null;
  }
}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}


