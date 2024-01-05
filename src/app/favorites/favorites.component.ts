import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../shared/models/favorites';
import { selectFavorites } from '../store/movies.selector';
import { CardItemComponent } from '../card-item/card-item.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MatCardModule, CardItemComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  store = inject(Store);
  favorites$: Observable<Favorite[]>;

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavorites);
  }
}
