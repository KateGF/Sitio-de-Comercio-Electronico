import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, CommonModule],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css']
})
export class ProductListPage implements OnInit {
  products: any[] = [];
  searchQuery: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedBrand: string = '';
  popularity: number | null = null;  // will be 0 to 5

  brands: string[] = [];
  suggestions: string[] = [];
  private searchSubject: Subject<string> = new Subject();

  categoryFilter: string = '';
  subcategoryFilter: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryFilter = params['category'] || '';
      this.subcategoryFilter = params['subcategory'] || '';
      this.loadProducts();
    });

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.loadSuggestions(query);
      this.loadProducts();
    });

    this.loadBrands();
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  loadSuggestions(query: string): void {
    if (query.length < 2) {
      this.suggestions = [];
      return;
    }
    this.productService.getProducts({ search: query, limit: 5 }).subscribe((data: any[]) => {
      this.suggestions = Array.from(new Set(data.map(p => p.name)));
    });
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.suggestions = [];
    this.loadProducts();
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe((data: string[]) => {
      this.brands = data;
    });
  }

  loadProducts(): void {
    const params: any = { search: this.searchQuery };
    if (this.minPrice !== null) params.priceMin = this.minPrice;
    if (this.maxPrice !== null) params.priceMax = this.maxPrice;
    if (this.selectedBrand) params.brand = this.selectedBrand;
    if (this.popularity !== null) params.popularity = this.popularity;
    if (this.categoryFilter) params.category = this.categoryFilter;
    if (this.subcategoryFilter) params.subcategory = this.subcategoryFilter;
    this.productService.getProducts(params).subscribe(data => {
      this.products = data;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedBrand = '';
    this.popularity = null;
    this.suggestions = [];
    this.loadProducts();
  }
}
