import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  deleteFavorite,
  setParamsMovies,
  successMovies,
  successUpdateFavorites,
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
    debugger;
    return {
      ...state,
      favorites: [...state.favorites, params],
    };
  }),

  on(successUpdateFavorites, (state, { data }) => {
    return {
      ...state,
      data: state.data.reduce((accu: Movie[], curr: Movie) => {
        accu.push({
          ...curr,
          favorite: data.find((f) => f.imdbID === curr.imdbID) ? true : false,
        });
        return accu;
      }, []),
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
    const index: number = state.data.findIndex(
      (item) => item.imdbID === data.imdbID
    );

    const updatedItems = [...state.data];
    updatedItems[index] = {
      ...data,
      favorite: !data.favorite,
    };

    let favorites: Favorite[] = state.favorites;

    if (!state.favorites.find((f) => f.imdbID === data.imdbID)) {
      favorites = [...state.favorites, data as Favorite];
    }

    return {
      ...state,
      data: updatedItems,
      favorites,
    };
  })
);
