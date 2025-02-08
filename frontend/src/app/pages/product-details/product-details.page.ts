import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.css']
})
export class ProductDetailsPage implements OnInit {
  product: any;
  currentImageIndex: number = 0;
  review: any = { rating: 0, comment: '' };
  isLoggedIn: boolean = false;
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Re-subscribe every time the route param changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  loadProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      this.currentImageIndex = 0; // reset carousel
      this.loadRelatedProducts();
    });
  }

  loadRelatedProducts(): void {
    if (!this.product || !this.product.category) return;
    // Get products with the same category, excluding the current product
    this.productService
      .getProducts({ category: this.product.category._id, limit: 6 })
      .subscribe(list => {
        this.relatedProducts = list.filter(p => p._id !== this.product._id);
      });
  }

  nextImage(): void {
    if (this.product?.images?.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage(): void {
    if (this.product?.images?.length > 1) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  submitReview(): void {
    if (this.product && this.product._id && this.review.comment.trim()) {
      this.productService.addReview(this.product._id, this.review).subscribe(updated => {
        this.product = updated;
        this.review = { rating: 0, comment: '' };
      });
    }
  }

  addToCart(): void {
    this.cartService.addToCart({ productId: this.product._id, quantity: 1 }).subscribe(() => {
      alert('Product added to cart!');
    });
  }

  addToWishlist(): void {
    if (!this.isLoggedIn) {
      alert('Please login to add items to your wishlist.');
      return;
    }
    this.userService.addToWishlist(this.product._id).subscribe(() => {
      alert('Product added to wishlist!');
    });
  }
}
