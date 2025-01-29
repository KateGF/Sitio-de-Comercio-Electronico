import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject } from "rxjs"

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  orders?: Order[]
}

export interface Order {
  id: number
  date: Date
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: string
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currentUserSubject.asObservable()

  constructor(private router: Router) {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser))
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 1,
          username: "john.doe",
          email: email,
          firstName: "John",
          lastName: "Doe",
          orders: [],
        }
        this.setCurrentUser(user)
        resolve(true)
      }, 1000)
    })
  }

  register(userData: Partial<User>): Promise<boolean> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Math.floor(Math.random() * 1000),
          username: userData.username!,
          email: userData.email!,
          firstName: userData.firstName!,
          lastName: userData.lastName!,
          orders: [],
        }
        this.setCurrentUser(user)
        resolve(true)
      }, 1000)
    })
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  updateUserProfile(userData: Partial<User>): Promise<boolean> {
    return new Promise((resolve) => {
      const currentUser = this.getCurrentUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userData }
        this.setCurrentUser(updatedUser)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user))
    this.currentUserSubject.next(user)
  }
}

