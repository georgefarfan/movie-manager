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
import {
  ActionType,
  Favorite,
  FavoriteParams,
} from '../shared/models/favorites';
import { MoviesService } from '../shared/services/movies/movies.service';
import { SessionStorageService } from '../shared/core/session-storage.service';
import { Movie } from '../shared/models/movie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAnnotatedComponent } from '../snackbar-annotated/snackbar-annotated.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MoviesEffects {
  _duration = 2;

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadMovies.type),
      withLatestFrom(this.store$),
      map(([_, state]) => {
        return {
          params: state.movies.params,
          favorites: state.movies.favorites,
        };
      }),
      exhaustMap(({ favorites, params }) =>
        this.moviesService.getMovies(params).pipe(
          map((result) => {
            const data = result.Search.map((m: Movie) => {
              return {
                ...m,
                favorite: favorites.find((f) => f.imdbID === m.imdbID)
                  ? true
                  : false,
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
      map(([params, state]) => {
        let paramValues = params as any as any;
        return {
          movie: paramValues.data as Movie,
          favorites: state.movies.favorites,
        };
      }),
      exhaustMap(({ movie, favorites }) => {
        this.sessionStorage.setFavorites(favorites);
        this.openSnackBar(
          this.translateService.instant('FAVORITES.ACTIONS.ADD', {
            x: movie.Title,
          })
        );
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

  // FAVORITES

  actionFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteFavorite.type, actions.updateFavorite.type),
      withLatestFrom(this.store$),
      map(([params, state]) => {
        let paramValues = (params as any).params as FavoriteParams;
        return {
          favorite: paramValues.favorite,
          favorites: state.movies.favorites,
          type: paramValues.action,
        };
      }),
      exhaustMap(({ favorite, favorites, type }) => {
        return this.actionFavorite(type, favorite, favorites);
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
                  curr[k].toString().includes(params.data[k].toString())
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
    private sessionStorage: SessionStorageService,
    private _snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  private actionFavorite(
    type: ActionType,
    favorite: Favorite,
    favorites: Favorite[]
  ): Observable<any> {
    let updateFavorites: Favorite[] = [];
    switch (type) {
      case ActionType.UPDATE:
        this.openSnackBar(
          this.translateService.instant('FAVORITES.ACTIONS.UPDATED', {
            x: favorite.Title,
          })
        );
        updateFavorites = this.updateMapping(favorite, favorites);
        break;

      case ActionType.DELETE:
        this.openSnackBar(
          this.translateService.instant('FAVORITES.ACTIONS.REMOVED', {
            x: favorite.Title,
          })
        );
        updateFavorites = this.deleteMapping(favorite, favorites);
        break;
      default:
        break;
    }

    this.sessionStorage.setFavorites(updateFavorites);
    return this.sessionStorage.getFavorites().pipe(
      map((data) => {
        return actions.successUpdateFavorites({
          data,
        });
      })
    );
  }

  private deleteMapping(favorite: Favorite, favorites: Favorite[]): Favorite[] {
    return favorites.filter((f) => f.imdbID !== favorite.imdbID);
  }

  private updateMapping(favorite: Favorite, favorites: Favorite[]): Favorite[] {
    return favorites.reduce((accu: Favorite[], curr: Favorite) => {
      let f = curr;
      if (curr.imdbID === favorite.imdbID) {
        f = favorite;
      }
      accu.push(f);
      return accu;
    }, []);
  }

  private openSnackBar(text: string): void {
    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration: this._duration * 1000,
      data: {
        text,
      },
    });
  }
}
