import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  map,
  catchError,
  EMPTY,
  withLatestFrom,
  Observable,
} from 'rxjs';
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

  deleteFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteFavorite.type),
      withLatestFrom(this.store$),
      map(([params, state]) => {
        return {
          favorite: (params as any).data as Favorite,
          currentFavorites: state.movies.favorites,
        };
      }),
      exhaustMap(({ favorite, currentFavorites }) => {
        const favorites = currentFavorites.filter(
          (f) => f.imdbID !== favorite.imdbID
        );
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

  updateFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateFavorite.type),
      withLatestFrom(this.store$),
      map(([params, state]) => {
        return {
          favorite: (params as any).data as Favorite,
          currentFavorites: state.movies.favorites,
        };
      }),
      exhaustMap(({ favorite, currentFavorites }) => {
        const favorites = currentFavorites.filter(
          (f) => f.imdbID !== favorite.imdbID
        );

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

      exhaustMap((params: any) => {
        return this.sessionStorage.getFavorites().pipe(
          map((result) => {
            let data = result;

            if (params.data) {
              const keys = Object.keys(params.data);
              data = data.reduce((accu: any[], curr: any) => {
                const finded = keys.find((k) =>
                  curr[k].includes(params.data[k])
                );
                if (finded) {
                  accu.push(curr);
                }
                return accu;
              }, []);
            }

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

  private actionFavorite(favorites: Favorite[]): Observable<any> {
    this.sessionStorage.setFavorites(favorites);
    return this.sessionStorage.getFavorites().pipe(
      map((data) => {
        return actions.successUpdateFavorites({
          data,
        });
      })
    );
  }

  private deleteMapping(favorites: Favorite[], favorite: Favorite): Favorite[] {
    return favorites.filter((f) => f.imdbID !== favorite.imdbID);
  }

  private updateMapping(favorites: Favorite[], favorite: Favorite): Favorite[] {
    return favorites.reduce((accu: Favorite[], curr: Favorite) => {
      let f = curr;
      if (curr.imdbID === favorite.imdbID) {
        f = favorite;
      }
      accu.push(f);
      return accu;
    }, []);
  }
}
