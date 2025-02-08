import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'YourApp';
  lowStockProducts: any[] = [];
  isAdmin: boolean = false;

  private stockCheckInterval: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      this.isAdmin = !!user && user.role === 'admin';
      if (this.isAdmin) {
        // Load now
        this.loadLowStockProducts();
        // Start polling for stock changes every 30 seconds
        this.startPolling();
      } else {
        // Clear data if not admin
        this.lowStockProducts = [];
        // Stop polling
        this.stopPolling();
      }
    });
  }

  ngOnDestroy(): void {
    // Ensure we clear the interval if this component is destroyed
    this.stopPolling();
  }

  startPolling(): void {
    // If there's an existing interval, clear it first
    this.stopPolling();
    // Poll every 30 seconds
    this.stockCheckInterval = setInterval(() => {
      this.loadLowStockProducts();
    }, 30_000);
  }

  stopPolling(): void {
    if (this.stockCheckInterval) {
      clearInterval(this.stockCheckInterval);
      this.stockCheckInterval = null;
    }
  }

  loadLowStockProducts(): void {
    // Fetch all products and filter for inventory < 10
    this.productService.getProducts({ limit: 9999 }).subscribe(products => {
      this.lowStockProducts = products.filter((p: any) => p.inventory < 10);
    });
  }
}
