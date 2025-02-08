import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service'; // <-- We'll need this
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.css']
})
export class WishlistPage implements OnInit {
  wishlistIds: string[] = [];  // We'll store just the IDs from the user
  wishlistProducts: any[] = [];  // We'll store the actual product objects here

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    // 1. Get the user’s profile
    this.userService.getProfile().subscribe(user => {
      this.wishlistIds = user.wishlist || [];  // e.g. ["67a5a5405e0d20e4a54b95ae", ...]
      // 2. If there's nothing, we're done
      if (!this.wishlistIds.length) {
        this.wishlistProducts = [];
        return;
      }
      // 3. For each wishlist ID, call productService.getProductById(...)
      const requests = this.wishlistIds.map(id => this.productService.getProductById(id));
      // 4. Use forkJoin to wait for all requests to complete
      forkJoin(requests).subscribe(productArray => {
        // productArray will be an array of fully loaded product objects
        this.wishlistProducts = productArray;
      });
    });
  }

  addToCart(productId: string): void {
    this.cartService.addToCart({ productId, quantity: 1 }).subscribe(() => {
      alert('Product added to cart!');
    });
  }

  removeFromWishlist(productId: string): void {
    // After removing from wishlist, reload
    this.userService.removeFromWishlist(productId).subscribe(() => {
      alert('Removed from wishlist.');
      this.loadWishlist();
    });
  }
}
