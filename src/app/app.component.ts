import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MoviesService } from './shared/services/movies/movies.service';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    StarRatingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarRatingConfigService],
})
export class AppComponent {
  count: WritableSignal<number> = signal(0);
  movieService = inject(MoviesService);

  constructor() {
    /**
     * effect(() => {
      console.log(`The count is: (${this.count()})`);
    });
     */
  }

  update(): void {
    // this.count.update((value) => value + 1);
  }
}
