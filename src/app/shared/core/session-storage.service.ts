import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Favorite } from '../models/favorites';
import { loadFavorites } from '../../store/movies.actions';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  public favorites$: BehaviorSubject<Favorite[] | null>;

  constructor(private store: Store<{}>) {
    this.favorites$ = new BehaviorSubject<Favorite[] | null>(null);
  }

  initialize(): void {
    this.store.dispatch(loadFavorites());
  }

  getFavorites(): Observable<Favorite[]> {
    return localStorage && localStorage['favorites']
      ? of(JSON.parse(localStorage['favorites']))
      : of([]);
  }

  setFavorites(data: Favorite[]): void {
    localStorage.setItem('favorites', JSON.stringify(data));
  }
}
