import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  categories: any[] = [];
  activeCategory: string | null = null; // Para manejar la categoría activa
  activeSubcategory: string | null = null; // Para manejar la subcategoría activa

  constructor(public authService: AuthService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    console.log('🔵 Categorías cargadas en HeaderComponent:', this.categories);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleCategory(categoryName: string) {
    this.activeCategory = this.activeCategory === categoryName ? null : categoryName;
  }

  toggleSubcategory(subcategoryName: string) {
    this.activeSubcategory = this.activeSubcategory === subcategoryName ? null : subcategoryName;
  }

  
}
