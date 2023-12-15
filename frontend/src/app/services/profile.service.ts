import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.url}/profile/${id}`)
      .pipe(catchError(err => throwError('La obtencion de un usuario es erronea: ', err)));
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put<User>(`${this.url}/profile/update/${id}`, user)
      .pipe(catchError(err => throwError('La actualizacion de un usuario es erronea: ', err)));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${this.url}/profile/delete/${id}`)
      .pipe(catchError(err => throwError('La eliminacion de un usuario es erronea: ', err)));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`)
      .pipe(catchError(err => throwError('La obtencion de todos los usuarios es erronea: ', err)));
  }

  get url(): string {
    return this.baseUrl;
  }

}

