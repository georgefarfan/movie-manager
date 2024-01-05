import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  deleteFavorite,
  setParamsMovies,
  successMovies,
  successUpdateFavorites,
  updateFavorite,
  updateMovie,
} from './movies.actions';
import { Movie } from '../shared/models/movie';
import { Favorite } from '../shared/models/favorites';

export interface MoviesState {
  params: string;
  data: Movie[];
  favorites: Favorite[];
}

export const initialState: MoviesState = {
  params: '',
  data: [],
  favorites: [],
};

export const moviesReducer = createReducer(
  initialState,

  // FAVORITES

  on(addFavorite, (state, { params }) => {
    return {
      ...state,
      favorites: [...state.favorites, params],
    };
  }),

  on(deleteFavorite, (state, { params }) => {
    return {
      ...state,
      favorites: state.favorites.filter((m) => m.imdbID !== params.imdbID),
    };
  }),

  on(updateFavorite, (state, { data }) => {
    const index = state.favorites.findIndex(
      (item) => item.imdbID === data.imdbID
    );

    const updatedItems = [...state.favorites];
    updatedItems[index] = data;

    return {
      ...state,
      favorites: updatedItems,
    };
  }),

  on(successUpdateFavorites, (state, { data }) => {
    return {
      ...state,
      favorites: data,
    };
  }),

  // MOVIES

  on(setParamsMovies, (state, { params }) => {
    return {
      ...state,
      params,
    };
  }),
  on(successMovies, (state, { data }) => {
    return {
      ...state,
      data,
    };
  }),

  on(updateMovie, (state, { data }) => {
    const index = state.data.findIndex((item) => item.imdbID === data.imdbID);

    const updatedItems = [...state.data];
    updatedItems[index] = {
      ...data,
      favorite: !data.favorite,
    };

    const favorites = updatedItems.filter((m) => m.favorite) as Favorite[];

    return {
      ...state,
      data: updatedItems,
      favorites,
    };
  })
);
