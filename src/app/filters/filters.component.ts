import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Filter } from './filters';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { setParamsMovies } from '../store/movies.actions';

@Component({
  selector: 'app-filters',
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
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Input()
  filters: Filter[];

  @Output()
  search = new EventEmitter<any>();

  store = inject(Store);
  form: FormGroup;
  fb = inject(FormBuilder);
  paramsKey: any = {};

  constructor() {}

  ngOnInit(): void {
    this.buildFilterParams();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.buildParams();
    });
  }

  private buildParams(): void {
    let params = '';
    this.paramsKey = null;
    this.filters.forEach((filter) => {
      if (this.form.get(filter.key)?.value) {
        this.paramsKey = {
          ...this.paramsKey,
          [filter.filterKey]: this.form.get(filter.key)?.value,
        };
        params = `${params}&${filter.key}=${this.form.get(filter.key)?.value}`;
      }
    });

    this.store.dispatch(
      setParamsMovies({
        params,
      })
    );
  }

  private buildFilterParams(): void {
    let formInputs: any = {};
    this.filters.forEach((filter) => {
      formInputs[filter.key] = [''];
    });
    this.form = this.fb.group(formInputs);
  }
}
