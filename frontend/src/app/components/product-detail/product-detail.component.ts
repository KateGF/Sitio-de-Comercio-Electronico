import { Component, type OnInit } from "@angular/core"
import { ActivatedRoute, RouterModule } from "@angular/router"
import { ProductService, type Product, type Review } from "../../services/product.service"
import { AuthService } from "../../services/auth.service"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined
  relatedProducts: Product[] = []
  userReview: Review = {
    userId: 0,
    username: "",
    rating: 0,
    comment: "",
    date: new Date(),
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get("id"))
    this.product = this.productService.getProductById(productId)
    if (this.product) {
      this.relatedProducts = this.productService.getRelatedProducts(this.product)
    }
  }

  submitReview() {
    if (this.product && this.authService.isLoggedIn()) {
      this.userReview.userId = this.authService.getCurrentUser()?.id || 0
      this.userReview.username = this.authService.getCurrentUser()?.username || ""
      this.userReview.date = new Date()
      this.productService.addReview(this.product.id, this.userReview)
      this.userReview = {
        userId: 0,
        username: "",
        rating: 0,
        comment: "",
        date: new Date(),
      }
    }
  }

  addToCart() {
    // Implement add to cart functionality
  }
}

