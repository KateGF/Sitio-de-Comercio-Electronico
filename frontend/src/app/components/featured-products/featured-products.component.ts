import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      image: "assets/images/product1.jpg",
      description: "High-quality wireless headphones with noise cancellation",
      rating: 4.5
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      image: "assets/images/product2.jpg",
      description: "Latest generation smartwatch with health tracking",
      rating: 4.2
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: 149.99,
      image: "assets/images/product3.jpg",
      description: "Portable bluetooth speaker with premium sound",
      rating: 4.7
    },
    {
      id: 4,
      name: "Laptop Pro",
      price: 1299.99,
      image: "assets/images/product4.jpg",
      description: "Professional laptop for demanding tasks",
      rating: 4.8
    }
  ];
}