import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api';
  private token = localStorage.getItem('token');
  private headers = {
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  };

  constructor(private http: HttpClient) {}

  addFilm(film: Film): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/film/create`, film, { headers: this.headers });
  }

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films`, { headers: this.headers });
  }

  getRandFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films/random`, { headers: this.headers });
  }

  getByCategory(idCategory: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films/category/${idCategory}`, { headers: this.headers });
  }
}
