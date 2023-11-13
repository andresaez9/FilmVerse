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
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User>({name: '', email: '', password: ''});

  constructor(private http: HttpClient, private router: Router) { 
    //this.checkToken();
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
          this.saveToken(user.token);
          this.loggedIn.next(true); // usuario logueado
          this.userSubject.next(user.user);
          return user;
        }
        }),
        catchError(err => this.handlerError(err)) 
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired-> ', isExpired);
    
    if (isExpired) {
      this.logout()
      this.router.navigate(['/']);
    } else {
      this.loggedIn.next(true);
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

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userValue(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
