import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  //register

  //login

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  get url(): string {
    return this.baseUrl;
  }
}
