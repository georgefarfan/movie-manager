import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY, withLatestFrom } from 'rxjs';
import * as actions from './movies.actions';
import { AppState } from './movies.selector';
import { Store } from '@ngrx/store';
import { Favorite } from '../shared/models/favorites';
import { MoviesService } from '../shared/services/movies/movies.service';
import { SessionStorageService } from '../shared/core/session-storage.service';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadMovies.type),
      withLatestFrom(this.store$),
      exhaustMap(([_, state]) =>
        this.moviesService.getMovies(state.movies.params).pipe(
          map((result) => {
            const data = result.Search.map((m: any) => {
              return {
                ...m,
                favorite: false,
              };
            });
            return actions.successMovies({
              data,
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateMovie.type),
      withLatestFrom(this.store$),
      exhaustMap(([_, state]) => {
        const favorites = state.movies.data.filter(
          (m) => m.favorite
        ) as Favorite[];
        this.sessionStorage.setFavorites(favorites);
        return this.sessionStorage.getFavorites().pipe(
          map((data) => {
            return actions.successUpdateFavorites({
              data,
            });
          })
        );
      })
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadFavorites.type),
      exhaustMap(() => {
        return this.sessionStorage.getFavorites().pipe(
          map((data) => {
            return actions.successUpdateFavorites({
              data,
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store$: Store<AppState>,
    private sessionStorage: SessionStorageService
  ) {}
}
