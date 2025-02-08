import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.css']
})
export class CheckoutPage implements OnInit {
  cart: any = { items: [] };
  shippingAddress: string = '';
  paymentMethod: string = '';
  
  // Fields for credit/debit card
  cardNumber: string = '';
  expirationDate: string = '';
  securityCode: string = '';
  cardholderName: string = '';

  // Fields for PayPal
  paypalEmail: string = '';
  paypalPassword: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
    });
  }

  confirmOrder(): void {
    // Basic checks to ensure fields are filled out
    if (!this.shippingAddress.trim()) {
      alert('Please enter a shipping address.');
      return;
    }
    if (!this.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (this.paymentMethod === 'credit') {
      if (
        !this.cardNumber.trim() ||
        !this.expirationDate.trim() ||
        !this.securityCode.trim() ||
        !this.cardholderName.trim()
      ) {
        alert('Please fill all credit/debit card fields.');
        return;
      }
    } else if (this.paymentMethod === 'paypal') {
      if (!this.paypalEmail.trim() || !this.paypalPassword.trim()) {
        alert('Please fill all PayPal fields.');
        return;
      }
    }

    // Simulate completing the checkout on the backend
    // In a real app, you'd call orderService.checkout(...)
    // Then, if successful:

    const confirmed = confirm('Purchase confirmed! Press OK to finalize and go to home page.');
    if (confirmed) {
      // Clear the cart on success
      this.cartService.clearCart().subscribe(() => {
        // Finally redirect to home
        this.router.navigate(['/']);
      });
    }
  }
}
