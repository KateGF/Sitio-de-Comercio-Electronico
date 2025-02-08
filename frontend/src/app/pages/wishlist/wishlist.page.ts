import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.css']
})
export class WishlistPage implements OnInit {
  // The wishlist from the user profile might be an array of product IDs or already populated objects.
  wishlistProducts: any[] = [];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.userService.getProfile().subscribe(user => {
      if (user) {
        const wishlist = user.wishlist || [];
        // Check if wishlist items are already populated (object) or just IDs (string)
        if (wishlist.length > 0 && typeof wishlist[0] === 'object') {
          // Already populated; use directly.
          this.wishlistProducts = wishlist;
        } else if (wishlist.length > 0) {
          // Wishlist contains only IDs; fetch product details.
          const requests = wishlist.map((id: string) =>
            this.productService.getProductById(id).pipe(
              catchError(err => {
                console.error(`Failed to load product with id ${id}`, err);
                return of(null);
              })
            )
          );
          // Specify the generic type <any[]> so that productArray is inferred as any[]
          forkJoin<any[]>(requests).subscribe((productArray) => {
            // Filter out any null responses from failed requests.
            this.wishlistProducts = productArray.filter((p: any) => p);
          });
        } else {
          this.wishlistProducts = [];
        }
      }
    });
  }

  addToCart(productId: string): void {
    this.cartService.addToCart({ productId, quantity: 1 }).subscribe(() => {
      alert('Product added to cart!');
    });
  }

  removeFromWishlist(productId: string): void {
    this.userService.removeFromWishlist(productId).subscribe(() => {
      alert('Removed from wishlist.');
      this.loadWishlist();
    });
  }
}
