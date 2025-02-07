import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(public authService: AuthService, private router: Router) {}

  editProduct(): void {
    this.router.navigate(['/admin-product-form'], { queryParams: { id: this.product._id } });
  }

  deleteProduct(): void {}
}
