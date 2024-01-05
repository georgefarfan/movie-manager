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
import { loadFavorites } from '../store/movies.actions';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MatCardModule,
    CardItemComponent,
    FiltersComponent,
  ],
  template: ` <div>
    <app-filters [filters]="filters" (search)="search($event)"></app-filters>
    <div>
      @if (favorites$ | async; as favorites) { @for (favorite of favorites;
      track favorite.imdbID) {
      <app-card-item [data]="favorite"></app-card-item>
      } @empty {
      <p>No results yet!</p>
      } }
    </div>
  </div>`,
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  store = inject(Store);
  favorites$: Observable<Favorite[]>;
  filters = [
    FilterMode.ID,
    FilterMode.TITLE,
    FilterMode.MOVIE_TYPE,
    FilterMode.YEAR,
  ];

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
}
