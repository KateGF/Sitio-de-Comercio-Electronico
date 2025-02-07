import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.css']
})
export class AdminProductsPage implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts({ limit: 100 }).subscribe(data => {
      this.products = data;
    });
  }

  editProduct(productId: string): void {
    this.router.navigate(['/admin-product-form'], { queryParams: { id: productId } });
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully.');
        this.loadProducts();
      });
    }
  }

  createProduct(): void {
    this.router.navigate(['/admin-product-form']);
  }
}
