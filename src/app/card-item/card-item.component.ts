import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from '../favorite/favorite.component';
import { MatCardModule } from '@angular/material/card';
import { Favorite } from '../shared/models/favorites';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, FavoriteComponent],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input()
  data: Movie | Favorite;

  @Input()
  showFavorite = false;

  @Output()
  updateMovie = new EventEmitter();
}
