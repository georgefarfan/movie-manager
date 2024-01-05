import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../shared/models/favorites';
import { selectFavorites } from '../store/movies.selector';
import { CardItemComponent } from '../card-item/card-item.component';
import { FiltersComponent } from '../filters/filters.component';
import { FilterMode } from '../filters/filters';
import {
  deleteFavorite,
  loadFavorites,
  updateFavorite,
} from '../store/movies.actions';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const FAVORITE_FILTERS = [
  FilterMode.ID,
  FilterMode.TITLE,
  FilterMode.MOVIE_TYPE,
  FilterMode.YEAR,
];

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MatCardModule,
    CardItemComponent,
    FiltersComponent,
    TranslateModule,
  ],
  template: ` <div>
    <app-filters [filters]="filters" (search)="search($event)"></app-filters>
    <div>
      @if (favorites$ | async; as favorites) { @for (favorite of favorites;
      track favorite.imdbID) {
      <app-card-item
        class="cursor-pointer"
        [data]="favorite"
        [showRemove]="true"
        (remove)="onRemove(favorite)"
        (click)="openDialog(favorite)"
      ></app-card-item>
      } @empty {
      <p>{{ 'MOVIES.NOT_DATA' | translate }}</p>
      } }
    </div>
  </div>`,
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  store = inject(Store);
  favorites$: Observable<Favorite[]>;
  filters = FAVORITE_FILTERS;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavorites);
  }

  search(paramsKey: any): void {
    this.store.dispatch(
      loadFavorites({
        data: paramsKey,
      })
    );
  }

  onRemove(favorite: Favorite): void {
    this.store.dispatch(
      deleteFavorite({
        data: favorite,
      })
    );
  }

  openDialog(favorite: Favorite): void {
    const dialog = this.dialog.open(FavoriteDialogComponent, {
      width: '550px',
      data: {
        favorite,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      this.store.dispatch(
        updateFavorite({
          data: result.data,
        })
      );
    });
  }
}
