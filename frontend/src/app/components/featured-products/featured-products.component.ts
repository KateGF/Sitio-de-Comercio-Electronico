import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ProductService, type Product } from "../../services/product.service"

@Component({
  selector: "app-featured-products",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./featured-products.component.html",
  styleUrls: ["./featured-products.component.scss"],
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = []

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.featuredProducts = products.slice(0, 4) // Get first 4 products as featured
    })
  }
}
