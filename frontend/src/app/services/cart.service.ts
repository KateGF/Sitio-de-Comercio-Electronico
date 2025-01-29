import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: CartItem[] = []
  private cartSubject = new BehaviorSubject<CartItem[]>([])
  private shippingAddress: ShippingAddress | null = null

  constructor() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart)
      this.cartSubject.next(this.cartItems)
    }
  }

  getCart() {
    return this.cartSubject.asObservable()
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cartItems.push({ ...item, quantity: 1 })
    }
    this.updateCart()
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
    this.updateCart()
  }

  updateQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find((i) => i.id === itemId)
    if (item) {
      item.quantity = quantity
      this.updateCart()
    }
  }

  clearCart() {
    this.cartItems = []
    this.updateCart()
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  setShippingAddress(address: ShippingAddress) {
    this.shippingAddress = address
  }

  calculateShipping(): number {
    // Simple shipping calculation based on total items
    const baseRate = 10
    const itemRate = 2
    return baseRate + this.getItemCount() * itemRate
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems])
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
  }
}

