import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];

  constructor(public authService: AuthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = this.nestCategories(data);
    });
  }

  nestCategories(categories: any[]): any[] {
    return categories
      .filter(cat => !cat.parent)
      .map(cat => ({
        ...cat,
        children: this.getChildren(cat._id, categories)
      }));
  }

  getChildren(parentId: string, categories: any[]): any[] {
    return categories
      .filter(cat => cat.parent === parentId)
      .map(cat => ({
        ...cat,
        children: this.getChildren(cat._id, categories)
      }));
  }
}
