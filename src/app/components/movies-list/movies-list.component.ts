import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie';
import { selectMoviesData } from '../../store/movies.selector';
import { FavoriteComponent } from '../favorite/favorite.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, FavoriteComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  store = inject(Store);
  movies$: Observable<Movie[]>;
  constructor() {
    this.movies$ = this.store.select(selectMoviesData);
  }
}
