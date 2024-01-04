import { createReducer, on } from '@ngrx/store';
import { setParamsMovies, successMovies } from './movies.actions';
import { Movie } from '../shared/models/movie';

export interface MoviesState {
  params: string;
  data: Movie[];
}

export const initialState: MoviesState = {
  params: '&s=gladiator',
  data: [],
};

export const moviesReducer = createReducer(
  initialState,
  on(setParamsMovies, (state, action) => {
    return {
      ...state,
      params: action.params,
    };
  }),
  on(successMovies, (state, action) => {
    return {
      ...state,
      data: action.data,
    };
  })
);
