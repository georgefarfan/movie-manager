import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionType, Favorite } from '../shared/models/favorites';
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
import { NoDataComponent } from '../no-data/no-data.component';
import { YearPickerComponent } from '../date-picker/year-picker/year-picker.component';

const FAVORITE_FILTERS = [
  FilterMode.ID,
  FilterMode.TITLE,
  FilterMode.DESCRIPTION,
  FilterMode.MOVIE_TYPE,
  FilterMode.YEAR,
  FilterMode.RATING,
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
    NoDataComponent,
    YearPickerComponent,
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
      <app-no-data [message]="'MOVIES.NOT_DATA'"></app-no-data>
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
        params: {
          action: ActionType.DELETE,
          favorite,
        },
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
      if (result) {
        this.store.dispatch(
          updateFavorite({
            params: {
              favorite: result.data,
              action: ActionType.UPDATE,
            },
          })
        );
      }
    });
  }
}
