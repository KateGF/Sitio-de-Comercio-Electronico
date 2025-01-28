import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Deal {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  description: string;
  timeLeft: string;
}

@Component({
  selector: 'app-daily-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-deals.component.html',
  styleUrls: ['./daily-deals.component.scss']
})
export class DailyDealsComponent {
  deals: Deal[] = [
    {
      id: 1,
      name: "Wireless Earbuds",
      originalPrice: 199.99,
      discountedPrice: 149.99,
      image: "assets/images/deal1.jpg",
      description: "Premium wireless earbuds with noise cancellation",
      timeLeft: "2h 45m"
    },
    {
      id: 2,
      name: "4K Smart TV",
      originalPrice: 899.99,
      discountedPrice: 699.99,
      image: "assets/images/deal2.jpg",
      description: "55-inch 4K Smart TV with HDR",
      timeLeft: "5h 30m"
    },
    {
      id: 3,
      name: "Gaming Console",
      originalPrice: 499.99,
      discountedPrice: 449.99,
      image: "assets/images/deal3.jpg",
      description: "Next-gen gaming console with controller",
      timeLeft: "1h 15m"
    }
  ];

  calculateDiscount(original: number, discounted: number): number {
    return Math.round(((original - discounted) / original) * 100);
  }
}