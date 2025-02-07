import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {
  highlightedProducts: any[] = [];
  featuredProducts: any[] = [];
  dealsOfTheDay: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts({ highlighted: true, limit: 5 }).subscribe(data => {
      this.highlightedProducts = data;
    });
    this.productService.getProducts({ featured: true, limit: 8 }).subscribe(data => {
      this.featuredProducts = data;
    });
    this.productService.getProducts({ deals: true, limit: 5 }).subscribe(data => {
      this.dealsOfTheDay = data;
    });
  }
}
