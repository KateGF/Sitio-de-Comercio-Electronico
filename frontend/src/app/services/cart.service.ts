import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addToCart(item: { productId: string, quantity: number }): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateCartItem(item: { productId: string, quantity: number }): Observable<any> {
    return this.http.put(this.apiUrl, item);
  }

  removeCartItem(productId: string): Observable<any> {
    const params = new HttpParams().set('productId', productId);
    return this.http.delete(this.apiUrl, { params });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart/clear`);
  }
}
