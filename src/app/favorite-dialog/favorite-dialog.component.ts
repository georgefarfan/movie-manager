import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Favorite } from '../shared/models/favorites';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  favorite: Favorite;
}

@Component({
  selector: 'app-favorite-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    StarRatingComponent,
  ],
  templateUrl: './favorite-dialog.component.html',
  styleUrl: './favorite-dialog.component.scss',
})
export class FavoriteDialogComponent implements OnInit {
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    description: [''],
    rating: [''],
  });

  constructor(
    private library: FaIconLibrary,
    public dialogRef: MatDialogRef<FavoriteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.library.addIcons(faStar, faStarHalf);
    if (data.favorite.description) {
      this.form.get('description')?.setValue(data.favorite.description);
    }
    if (data.favorite.rating) {
      this.form.get('rating')?.setValue(data.favorite.rating);
    }
  }

  ngOnInit(): void {}

  get rating(): FormControl {
    return this.form.get('rating') as FormControl;
  }

  action(): void {
    this.dialogRef.close({
      data: {
        ...this.data.favorite,
        ...this.form.value,
      },
    });
  }
}
