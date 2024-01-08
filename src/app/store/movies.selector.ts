import { createSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducer';
import { Movie } from '../shared/models/movie';
import { Favorite } from '../shared/models/favorites';
import { Tag } from '../shared/models/tag';

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

export const selectFavorites = createSelector(
  selectMovies,
  (state: MoviesState): Favorite[] => state.favorites
);

export const selectTags = createSelector(
  selectMovies,
  (state: MoviesState): Tag[] => state.tags
);
