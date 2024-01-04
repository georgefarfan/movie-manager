import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { loadMovies, setParamsMovies } from '../../store/movies.actions';
import { FilterType } from '../../shared/models/filters';
import { debounceTime, distinctUntilChanged } from 'rxjs';

const OPTIONS = [
  { value: 'full', label: 'Full' },
  { value: 'short', label: 'Short' },
];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatButtonModule,
  ],
  providers: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  options = OPTIONS;
  fb = inject(FormBuilder);
  store = inject(Store);

  constructor() {
    this.form = this.fb.group({
      title: [''],
      year: [''],
      selectedOption: [''],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.buildParams();
      });
  }

  private buildParams(): void {
    let params = '';

    if (this.form.get('title')?.value) {
      params = `${params}&${FilterType.SEARCH}=${
        this.form.get('title')?.value
      }`;
    }

    if (this.form.get('year')?.value) {
      params = `${params}&${FilterType.YEAR}=${this.form.get('year')?.value}`;
    }

    if (this.form.get('selectedOption')?.value) {
      params = `${params}&${FilterType.PLOT}=${
        this.form.get('selectedOption')?.value
      }`;
    }

    this.store.dispatch(
      setParamsMovies({
        params,
      })
    );
  }

  search(): void {
    this.store.dispatch(loadMovies());
  }
}
