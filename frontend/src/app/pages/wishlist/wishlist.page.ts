import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.css']
})
export class WishlistPage implements OnInit {
  wishlist: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.wishlist = user.wishlist || [];
    });
  }
}
