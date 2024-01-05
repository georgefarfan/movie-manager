import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CardItemComponent } from '../card-item/card-item.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MatCardModule, CardItemComponent],
  templateUrl: './favorite.component.html',
})
export class FavoriteComponent implements OnInit {
  @Input()
  active: boolean;

  constructor(private library: FaIconLibrary) {}

  ngOnInit(): void {
    this.library.addIcons(faStar);
  }
}
