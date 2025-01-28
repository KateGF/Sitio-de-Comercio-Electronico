import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router" // Added RouterModule import

interface Promotion {
  id: number
  title: string
  description: string
  image: string
  link: string
}

@Component({
  selector: "app-promotion-slider",
  standalone: true,
  imports: [CommonModule, RouterModule], // Added RouterModule to imports
  templateUrl: "./promotion-slider.component.html",
  styleUrls: ["./promotion-slider.component.scss"],
})
export class PromotionSliderComponent implements OnInit {
  currentSlide = 0
  promotions: Promotion[] = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Get up to 50% off on summer collection",
      image: "/assets/images/product1.jpg",
      link: "/summer-sale",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest electronics",
      image: "/assets/images/product1.jpg",
      link: "/new-arrivals",
    },
    {
      id: 3,
      title: "Special Offer",
      description: "Free shipping on orders over $100",
      image: "/assets/images/product1.jpg",
      link: "/special-offer",
    },
  ]

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.promotions.length
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.promotions.length) % this.promotions.length
  }

  goToSlide(index: number) {
    this.currentSlide = index
  }

  ngOnInit() {
    setInterval(() => {
      this.nextSlide()
    }, 5000)
  }
}

