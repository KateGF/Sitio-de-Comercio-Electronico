import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): void {
    console.log('Login attempt with:', email, password);
    localStorage.setItem('auth_token', 'fake_token');
    this.isAuthenticatedSubject.next(true);
  }

  register(name: string, email: string, password: string): void {
    console.log('Register attempt with:', name, email, password);
    localStorage.setItem('auth_token', 'fake_token');
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }
}