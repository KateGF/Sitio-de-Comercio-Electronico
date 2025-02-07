import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, KeyValuePipe],
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.css']
})
export class ProductDetailsPage implements OnInit {
  product: any;
  review: any = { rating: 0, comment: '' };
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(data => {
        this.product = data;
      });
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
