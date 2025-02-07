import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, updateData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profile`);
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, { productId });
  }
}
