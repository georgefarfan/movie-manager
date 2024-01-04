import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY, withLatestFrom } from 'rxjs';
import { MoviesService } from '../services/movies/movies.service';
import * as actions from './movies.actions';
import { AppState } from './movies.selector';
import { Store } from '@ngrx/store';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadMovies.type),
      withLatestFrom(this.store$),
      exhaustMap(([action, state]) =>
        this.moviesService.getMovies(state.movies.params).pipe(
          map((result) =>
            actions.successMovies({
              data: result.Search,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store$: Store<AppState>
  ) {}
}
