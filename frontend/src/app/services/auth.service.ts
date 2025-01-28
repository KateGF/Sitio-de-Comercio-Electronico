import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Cambia según la URL de tu backend

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Inicio de sesión
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Ruta protegida
  getUserProfile(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
