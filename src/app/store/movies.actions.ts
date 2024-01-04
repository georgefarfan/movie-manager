import { createAction, props } from '@ngrx/store';

export const setParamsMovies = createAction(
  '[Movies] Set params',
  props<{ params: string }>()
);

export const loadMovies = createAction('[Movies] Load');

export const successMovies = createAction(
  '[Movies] Movies Loaded Success',
  props<{ data: any[] }>()
);

export const errorMovies = createAction('[Movies] Movies Loaded Error');
