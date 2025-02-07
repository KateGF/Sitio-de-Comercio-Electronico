import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.css']
})
export class CheckoutPage {
  shippingAddress: string = '';
  paymentMethod: string = 'credit_card';

  constructor(private orderService: OrderService, private router: Router) {}

  checkout(): void {
    const orderData = {
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    };
    this.orderService.checkout(orderData).subscribe(order => {
      this.router.navigate(['/profile']);
    });
  }
}
