import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = 'http://127.0.0.1:8000/api';
  private _token = localStorage.getItem('token');
  private headers = {
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  };

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${this.baseUrl}/categories`, { headers: this.headers });
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.baseUrl}/category/${id}`, { headers: this.headers });
  }
  
  get token(): string {
    return this._token!;
  }
}
