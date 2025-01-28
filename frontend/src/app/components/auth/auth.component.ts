import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,  // Asegurar que es standalone
  imports: [FormsModule],  // Importar FormsModule
})
export class AuthComponent {
  name = '';
  email = '';
  password = '';
  token = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  register() {
    const data = { name: this.name, email: this.email, password: this.password };
    this.authService.register(data).subscribe({
      next: () => this.toastr.success('Usuario registrado correctamente'),
      error: (err) => this.toastr.error(err.error.message),
    });
  }

  login() {
    const data = { email: this.email, password: this.password };
    this.authService.login(data).subscribe({
      next: (res) => {
        this.token = res.token;
        this.toastr.success('Inicio de sesión exitoso');
      },
      error: (err) => this.toastr.error(err.error.message),
    });
  }

  getUserProfile() {
    this.authService.getUserProfile(this.token).subscribe({
      next: (res) => this.toastr.success('Token válido, perfil obtenido'),
      error: (err) => this.toastr.error(err.error.message),
    });
  }
}
