import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  loadFavorites,
  loadMovies,
  setParamsMovies,
  successMovies,
  successUpdateFavorites,
  updateMovie,
} from './movies.actions';
import { Movie } from '../shared/models/movie';
import { Favorite } from '../shared/models/favorites';
import { LoadingState } from './call-state';

export interface MoviesState {
  params: string;
  data: Movie[];
  favorites: Favorite[];
  callState: LoadingState;
}

export const initialState: MoviesState = {
  params: '',
  data: [],
  favorites: [],
  callState: LoadingState.INIT,
};

export const moviesReducer = createReducer(
  initialState,

  // MOVIES

  on(loadMovies, (state) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  }),
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
      callState: LoadingState.LOADED,
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
      favorites = [
        ...state.favorites,
        {
          ...data,
          description: '',
          rating: 0,
        } as Favorite,
      ];
    }

    return {
      ...state,
      data: updatedItems,
      favorites,
    };
  }),

  // FAVORITES

  on(loadFavorites, (state) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  }),

  on(addFavorite, (state, { params }) => {
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
      callState: LoadingState.LOADED,
    };
  })
);
