import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.css']
})
export class CartPage implements OnInit {
  cart: any = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateCartItem({ productId, quantity }).subscribe(() => this.loadCart());
  }

  removeItem(productId: string): void {
    this.cartService.removeCartItem(productId).subscribe(() => this.loadCart());
  }
}
