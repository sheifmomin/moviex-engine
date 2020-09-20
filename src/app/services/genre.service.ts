import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  public getAllGenre() {
    return this.http.get(`http://localhost:3000/genre`);
  }
}
