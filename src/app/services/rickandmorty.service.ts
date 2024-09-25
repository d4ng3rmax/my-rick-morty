import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  getCharactersByName(name: string, page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}&page=${page}`);
  }

  getAllCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  getCharactersByPage(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }
}
