import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  getCharactersByName(name: string, page: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/?name=${name}&page=${page}`).pipe(
      map(response => response.results || [])
    );
  }

  getAllCharacters(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(response => response.results || [])
    );
  }

  getCharactersByPage(page: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      delay(1200),
      map(response => response.results || [])
    );
  }
}
