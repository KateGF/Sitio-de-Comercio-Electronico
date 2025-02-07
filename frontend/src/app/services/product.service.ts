import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts(queryParams?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params: queryParams });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addReview(productId: string, review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/reviews`, review);
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
