import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromotionSliderComponent } from '../../components/promotion-slider/promotion-slider.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { DailyDealsComponent } from '../../components/daily-deals/daily-deals.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PromotionSliderComponent,
    FeaturedProductsComponent,
    DailyDealsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}