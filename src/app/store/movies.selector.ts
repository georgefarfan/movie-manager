import { createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';
import { Movie } from '../shared/models/movie';

export interface AppState {
  movies: MoviesState;
}

export const selectMovies = (state: AppState) => state.movies;

export const selectParams = createSelector(
  selectMovies,
  (state: MoviesState): string => state.params
);

export const selectMoviesData = createSelector(
  selectMovies,
  (state: MoviesState): Movie[] => state.data
);
