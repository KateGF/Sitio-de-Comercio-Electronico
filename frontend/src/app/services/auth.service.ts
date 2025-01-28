import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verificar si hay un token almacenado al iniciar el servicio
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): void {
    // Aquí iría la lógica real de autenticación con tu backend
    // Por ahora, simularemos un login exitoso
    console.log('Intento de login con:', email, password);
    localStorage.setItem('auth_token', 'fake_token');
    this.isAuthenticatedSubject.next(true);
  }

  register(name: string, email: string, password: string): void {
    // Aquí iría la lógica real de registro con tu backend
    // Por ahora, simularemos un registro exitoso
    console.log('Intento de registro con:', name, email, password);
    localStorage.setItem('auth_token', 'fake_token');
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}