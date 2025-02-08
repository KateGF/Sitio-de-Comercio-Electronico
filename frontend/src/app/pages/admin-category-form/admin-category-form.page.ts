import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-category-form.page.html',
  styleUrls: ['./admin-category-form.page.css']
})
export class AdminCategoryFormPage implements OnInit {
  category: any = {
    name: '',
    parent: ''
  };
  isEditMode: boolean = false;
  parentOptions: any[] = [];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadParentOptions();
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryService.getCategoryById(id).subscribe(data => {
        this.category = data;
      });
    }
  }

  loadParentOptions(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.parentOptions = data.filter(cat => !cat.parent);
    });
  }

  saveCategory(): void {
    if (this.isEditMode) {
      this.categoryService.updateCategory(this.category._id, this.category).subscribe(() => {
        alert('Category updated successfully.');
        this.router.navigate(['/admin-categories']);
      });
    } else {
      this.categoryService.createCategory(this.category).subscribe(() => {
        alert('Category created successfully.');
        this.router.navigate(['/admin-categories']);
      });
    }
  }
}
