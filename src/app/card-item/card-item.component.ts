import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FavoriteComponent } from '../favorite/favorite.component';
import { MatCardModule } from '@angular/material/card';
import { Favorite } from '../shared/models/favorites';
import { Movie } from '../shared/models/movie';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FavoriteComponent,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent implements OnInit {
  @Input()
  data: Movie | Favorite;

  @Input()
  showFavorite = false;

  @Input()
  showRemove = false;

  @Output()
  updateMovie = new EventEmitter();

  @Output()
  remove = new EventEmitter();

  constructor(private library: FaIconLibrary) {}

  ngOnInit(): void {
    this.library.addIcons(faTrash);
  }
}
