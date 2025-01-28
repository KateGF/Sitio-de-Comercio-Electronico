import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]), // Define las rutas de la aplicación
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule, // 🔹 Requerido para Toastr
      ToastrModule.forRoot()   // 🔹 Agregar ToastrModule globalmente
    ),
  ],
}).catch((err) => console.error(err));
