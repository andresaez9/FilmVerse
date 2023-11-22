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

  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.baseUrl}/film/${id}`, { headers: this.headers });
  }

  getRandFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films/random`, { headers: this.headers });
  }

  getByCategory(idCategory: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films/category/${idCategory}`, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/film/delete/${id}`, { headers: this.headers });
  }

  update(id: number, film: Film): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/film/update/${id}`, film, { headers: this.headers });
  }

  getMagnetLink(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/film/torrent/${id}`, { headers: this.headers });
  }

  stream(magnetLink: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8808/stream?torrentUrl=${magnetLink}`, { headers: this.headers });
  }
}
