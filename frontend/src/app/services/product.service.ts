import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  rating: number
  category: string
  specifications: { [key: string]: string }
  reviews: Review[]
}

export interface Review {
  userId: number
  username: string
  rating: number
  comment: string
  date: Date
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      image: "assets/images/product1.jpg",
      description: "High-quality wireless headphones with noise cancellation",
      rating: 4.5,
      category: "Electronics",
      specifications: {
        Brand: "AudioTech",
        Type: "Over-ear",
        Wireless: "Yes",
        "Battery Life": "20 hours",
        "Noise Cancellation": "Active",
      },
      reviews: [
        {
          userId: 1,
          username: "AudioPhile",
          rating: 5,
          comment: "Amazing sound quality and comfort!",
          date: new Date("2023-05-15"),
        },
        {
          userId: 2,
          username: "MusicLover",
          rating: 4,
          comment: "Great headphones, but battery life could be better.",
          date: new Date("2023-05-10"),
        },
      ],
    },
    // Add more products here...
  ]

  private productsSubject = new BehaviorSubject<Product[]>(this.products)

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable()
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  addReview(productId: number, review: Review): void {
    const product = this.products.find((p) => p.id === productId)
    if (product) {
      product.reviews.push(review)
      this.updateProductRating(product)
      this.productsSubject.next(this.products)
    }
  }

  private updateProductRating(product: Product): void {
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
    product.rating = totalRating / product.reviews.length
  }

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return this.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
  }
}

