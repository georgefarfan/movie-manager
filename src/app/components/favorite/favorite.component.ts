import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
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
