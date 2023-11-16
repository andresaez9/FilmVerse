import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { map, catchError, of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { User, UserResponse } from '../interfaces/user.interface';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://127.0.0.1:8000/api';
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { 
    this.checkToken();
  }

  signUp(authData: User): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, authData)
      .pipe(map(user => {
          console.log('Res-> ', user);
        }),
        catchError(err => this.handlerError(err)) 
      );
  }

  login(authData: UserResponse): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, authData)
      .pipe(map(user => {
        if (user && user.token) {
          console.log('Res-> ', user);
          this.saveIsAdmin(user.user.user_type);
          this.saveToken(user.token);
          this.loggedIn.next(true);
          this.saveLoggedIn();
          this._userSubject.next(user.user);
          this.saveUser();
          return user;
        }
        }),
        catchError(err => this.handlerError(err)) 
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.saveLoggedIn();
  }

  // va al header para controlar si esta logueado o no pero tengo loggedIn
  /*hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }*/

  saveIsAdmin(type: string) {
    localStorage.setItem('type', type);
  }

  saveLoggedIn() {
    localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn.getValue()));
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify(this._userSubject.getValue()));
  }

  isAdmin(): boolean {
    const type = localStorage.getItem('type');
    return type === 'admin';
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    console.log('isExpired-> ', userToken);
    
    if (!userToken) {
      this.logout()
    }
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocurred retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get url(): string {
    return this.baseUrl;
  }

  get userSubject(): Observable<User> {
    return this._userSubject.asObservable();
  }
}
