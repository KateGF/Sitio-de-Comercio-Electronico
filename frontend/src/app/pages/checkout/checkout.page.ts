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

  // Credit/Debit card fields
  cardNumber: string = '';
  expirationDate: string = '';
  securityCode: string = '';
  cardholderName: string = '';

  // PayPal fields
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
    // Validate shipping address and payment method
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

    // Build the order object
    const orderData: any = {
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod,
      // Optionally include payment details; backend may ignore these for simulation
      paymentDetails:
        this.paymentMethod === 'credit'
          ? {
              cardNumber: this.cardNumber,
              expirationDate: this.expirationDate,
              securityCode: this.securityCode,
              cardholderName: this.cardholderName
            }
          : {
              paypalEmail: this.paypalEmail,
              paypalPassword: this.paypalPassword
            }
    };

    // Confirm order with the user
    const confirmed = confirm('Purchase confirmed! Press OK to finalize your order.');
    if (confirmed) {
      // Call the backend checkout endpoint
      this.orderService.checkout(orderData).subscribe(
        (order) => {
          // Optionally clear the cart locally
          this.cartService.clearCart().subscribe(() => {
            alert('Your order has been placed. Thank you!');
            this.router.navigate(['/']);
          });
        },
        (error) => {
          alert('There was an error processing your order.');
        }
      );
    }
  }
}
