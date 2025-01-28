import { Injectable } from "@angular/core"
import { Router } from "@angular/router" // Changed from type-only import to regular import

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn = false

  constructor(private router: Router) {} // Now Router can be properly injected

  login(email: string, password: string): boolean {
    // Implement actual login logic here
    this._isLoggedIn = true
    return true
  }

  logout(): void {
    this._isLoggedIn = false
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  // Optional: Add method to check if user is authenticated
  getAuthStatus(): boolean {
    return this._isLoggedIn
  }


  register(name: string, email: string, password: string): boolean {
    // Implement actual registration logic here
    // For now, we'll just simulate a successful registration
    console.log("Registering user:", { name, email, password })
    this._isLoggedIn = true
    this.router.navigate(["/"])
    return true
  }

}

