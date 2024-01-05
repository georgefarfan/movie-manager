import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FiltersComponent } from '../filters/filters.component';
import { FilterMode } from '../filters/filters';
import { loadMovies } from '../store/movies.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MoviesListComponent,
    TranslateModule,
    FiltersComponent,
  ],
  template: ` <div>
    <app-filters [filters]="filters" (search)="search()"></app-filters>
    <div>
      <app-movies-list></app-movies-list>
    </div>
  </div>`,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  filters = [FilterMode.TITLE, FilterMode.YEAR, FilterMode.PLOT];
  store = inject(Store);

  search(): void {
    this.store.dispatch(loadMovies());
  }
}
