import { createAction, props } from '@ngrx/store';
import { Favorite, FavoriteParams } from '../shared/models/favorites';
import { Movie } from '../shared/models/movie';

// MOVIES

export const setParamsMovies = createAction(
  '[Movies] Set params',
  props<{ params: string }>()
);

export const loadMovies = createAction('[Movies] Load');

export const successMovies = createAction(
  '[Movies] Movies Loaded Success',
  props<{ data: Movie[] }>()
);

export const updateMovie = createAction(
  '[Movies] Update ',
  props<{ data: Movie }>()
);

export const errorMovies = createAction('[Movies] Movies Loaded Error');

// FAVORITES

export const loadFavorites = createAction(
  '[Favorite] Load',
  props<{ data: any }>()
);

export const addFavorite = createAction(
  '[Favorites] add',
  props<{ params: Favorite }>()
);

export const deleteFavorite = createAction(
  '[Favorites] delete',
  props<{ params: FavoriteParams }>()
);

export const updateFavorite = createAction(
  '[Favorite] Update ',
  props<{ params: FavoriteParams }>()
);

export const successUpdateFavorites = createAction(
  '[Favorite] Update Success',
  props<{ data: Favorite[] }>()
);
