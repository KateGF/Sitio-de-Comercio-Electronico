import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.page.html',
  styleUrls: ['./admin-categories.page.css']
})
export class AdminCategoriesPage implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  editCategory(categoryId: string): void {
    this.router.navigate(['/admin-category-form'], { queryParams: { id: categoryId } });
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        alert('Category deleted successfully.');
        this.loadCategories();
      });
    }
  }

  createCategory(): void {
    this.router.navigate(['/admin-category-form']);
  }
}
