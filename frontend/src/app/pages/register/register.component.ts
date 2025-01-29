import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Register submitted');
    this.authService.register({
      username: this.name, // Ajustar si "username" es diferente en el formulario
      email: this.email,
      firstName: this.name, // Si "name" es firstName en User
      lastName: '' // Si no tienes un campo de apellido en el formulario
    }).then(() => {
      this.router.navigate(['/']);
    });
    
    this.router.navigate(['/']);
  }
}