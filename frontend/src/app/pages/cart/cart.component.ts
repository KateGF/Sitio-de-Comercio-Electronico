import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CartService, type CartItem } from "../../services/cart.service"

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []
  subtotal = 0
  shipping = 0
  total = 0

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items
      this.updateTotals()
    })
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(item.id, quantity)
    }
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId)
  }

  private updateTotals() {
    this.subtotal = this.cartService.getTotal()
    this.shipping = this.cartService.calculateShipping()
    this.total = this.subtotal + this.shipping
  }

  proceedToCheckout() {
    // Will implement in the checkout component
  }
}

