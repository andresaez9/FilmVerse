import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  private readonly baseUrl = 'http://127.0.0.1:8000/api';
  private _token = localStorage.getItem('token');
  private headers = {
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  };

  constructor(private http: HttpClient) { }

  getAllTorrents() {
    return this.http.get(`${this.baseUrl}/torrents`, { headers: this.headers });
  }

  getMagnetLinkById(id: number) {
    return this.http.get(`${this.baseUrl}/torrent/${id}`, { headers: this.headers });
  }

  get token(): string {
    return this._token!;
  }
}
