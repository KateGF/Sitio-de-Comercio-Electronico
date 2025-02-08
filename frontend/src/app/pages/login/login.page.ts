// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  credentials: any = { email: '', password: '' };
  errorMessage: string = '';
  
  // Build social login URLs using the API URL from the environment
  googleAuthUrl: string = environment.apiUrl + '/auth/google';
  facebookAuthUrl: string = environment.apiUrl + '/auth/facebook';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: err =>
        (this.errorMessage =
          err.error?.message || 'Login failed. Please try again.')
    });
  }
}
