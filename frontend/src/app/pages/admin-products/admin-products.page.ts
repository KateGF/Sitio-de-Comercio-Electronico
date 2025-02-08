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

  // We'll use a tab system: "products" tab vs "notifications"
  activeTab: string = 'products';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Load all products for admin
    // (Increase limit if needed to get all)
    this.productService.getProducts({ limit: 9999 }).subscribe(data => {
      this.products = data;
    });
  }

  createProduct(): void {
    this.router.navigate(['/admin-product-form']);
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // A getter to filter products with inventory < 10
  get lowStockProducts(): any[] {
    return this.products.filter(prod => prod.inventory < 10);
  }
}
