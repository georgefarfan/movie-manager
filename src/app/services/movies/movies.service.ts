import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MovieResult } from '../../shared/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(params: string): Observable<MovieResult> {
    return this.http.get(
      `${environment.BASE_URL}${params}`
    ) as Observable<MovieResult>;
  }
}
