import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnInit {
  @Input() fControlName: FormControl;

  currentStar: WritableSignal<number> = signal(0);

  _limit: number[];

  @Input()
  set limit(items: number) {
    this.currentStar.update(() => this.fControlName.value);
    this._limit = Array.from({ length: items }, (value, index) => index + 1);
  }

  ngOnInit(): void {}

  constructor() {}

  update(pos: number): void {
    this.currentStar.update((value) => pos);
    this.fControlName.setValue(this.currentStar());
  }
}
