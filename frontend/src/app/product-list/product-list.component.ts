import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
  ];
}