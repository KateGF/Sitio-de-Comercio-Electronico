import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-product-form.page.html',
  styleUrls: ['./admin-product-form.page.css']
})
export class AdminProductFormPage implements OnInit {
  product: any = {
    name: '',
    price: 0,
    brand: '',
    description: '',
    images: '',
    technicalSpecifications: '',
    inventory: 0,
    discount: { type: '', value: 0 }
  };
  isEditMode: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(id).subscribe(data => {
        this.product = data;
        if (Array.isArray(this.product.images)) {
          this.product.images = this.product.images.join(', ');
        }
        if (typeof this.product.technicalSpecifications === 'object') {
          this.product.technicalSpecifications = JSON.stringify(this.product.technicalSpecifications);
        }
      });
    }
  }

  saveProduct(): void {
    if (typeof this.product.images === 'string') {
      this.product.images = this.product.images.split(',').map((s: string) => s.trim());
    }
    if (typeof this.product.technicalSpecifications === 'string') {
      try {
        this.product.technicalSpecifications = JSON.parse(this.product.technicalSpecifications);
      } catch (e) {
        alert('Technical Specifications must be valid JSON.');
        return;
      }
    }
    if (this.isEditMode) {
      this.productService.updateProduct(this.product._id, this.product).subscribe(() => {
        alert('Product updated successfully.');
        this.router.navigate(['/products/admin']);
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        alert('Product created successfully.');
        this.router.navigate(['/products/admin']);
      });
    }
  }
}
