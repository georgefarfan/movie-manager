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
  FormControl,
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
import { YearPickerComponent } from '../date-picker/year-picker/year-picker.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FiltersManageComponent } from './components/filters-manage/filters-manage.component';
import { InputRangeComponent } from './components/input-range/input-range.component';

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
    YearPickerComponent,
    MatDialogModule,
    InputRangeComponent,
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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.buildFields();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.buildParams();
    });
  }

  private buildParams(): void {
    let params = '';
    this.paramsKey = null;
    this.filters.forEach((filter) => {
      const item = this.form.get(filter.key)?.value;
      if (item.value) {
        this.paramsKey = {
          ...this.paramsKey,
          [filter.filterKey]: item.value,
        };
        params = `${params}&${filter.key}=${item.value}`;
      }
    });

    this.store.dispatch(
      setParamsMovies({
        params,
      })
    );
  }

  private buildFields(): void {
    let formInputs: any = {};

    this.filters.forEach((filter) => {
      formInputs[filter.key] = new FormGroup({
        value: new FormControl(''),
        show: new FormControl(true),
        data: new FormControl(filter),
      });
      if (filter.required) {
        formInputs[filter.key] = new FormGroup({
          value: new FormControl(null),
          show: new FormControl(true),
          data: new FormControl(filter),
        });
      }
    });
    this.form = this.fb.group(formInputs);
  }

  public get year() {
    return this.form.get('y')?.get('value') as FormControl;
  }

  public get rating(): FormGroup {
    return this.form.get('rating') as FormGroup;
  }

  clear(): void {
    this.filters.forEach((f) => {
      this.form.get(f.key)?.get('value')?.setValue(null);
    });

    this.store.dispatch(
      setParamsMovies({
        params: '',
      })
    );
    this.search.emit();
  }

  openSettingDialog(): void {
    this.dialog.open(FiltersManageComponent, {
      width: '550px',
      data: {
        form: this.form,
        items: Object.keys(this.form.value),
        filters: this.filters,
      },
    });
  }
}
