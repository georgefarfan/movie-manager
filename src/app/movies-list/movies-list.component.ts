import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';
import { selectMoviesData } from '../store/movies.selector';
import { CardItemComponent } from '../card-item/card-item.component';
import { updateMovie } from '../store/movies.actions';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NoDataComponent,
    CardItemComponent,
    TranslateModule,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  store = inject(Store);
  movies$: Observable<Movie[]>;
  constructor() {}

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMoviesData);
  }

  updateMovie(movie: Movie): void {
    this.store.dispatch(
      updateMovie({
        data: movie,
      })
    );
  }
}
