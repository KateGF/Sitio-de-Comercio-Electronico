import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component'; // Importar correctamente AuthComponent

@Component({
  selector: 'app-root', // Corrige el selector
  standalone: true, // Declarar como standalone si no usas NgModule
  imports: [RouterOutlet, AuthComponent], // Asegúrate de incluir AuthComponent correctamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Usa styleUrls (plural)
})
export class AppComponent {
  title = 'frontend';
}
