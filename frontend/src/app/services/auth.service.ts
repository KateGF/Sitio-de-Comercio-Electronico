import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

interface User {
  id: number
  username: string
  email: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn = false
  private currentUser: User | null = null

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Implement actual login logic here
    this._isLoggedIn = true
    this.currentUser = { id: 1, username: "JohnDoe", email: email }
    return true
  }

  register(username: string, email: string, password: string): boolean {
    // Implement actual registration logic here
    this._isLoggedIn = true
    this.currentUser = { id: 1, username: username, email: email }
    return true
  }

  logout(): void {
    this._isLoggedIn = false
    this.currentUser = null
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  getCurrentUserId(): number {
    return this.currentUser?.id ?? 0
  }

  getCurrentUsername(): string {
    return this.currentUser?.username ?? ""
  }
}

