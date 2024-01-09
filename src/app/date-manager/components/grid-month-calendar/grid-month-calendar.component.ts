import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import moment from 'moment';
import { HeaderDateManagerComponent } from '../header-date-manager/header-date-manager.component';

interface Month {
  date: string;
  initial: string;
}

interface GridCalendarParam {
  readonly: boolean;
  form: FormGroup;
}

@Component({
  selector: 'app-grid-month-calendar',
  standalone: true,
  imports: [
    CommonModule,
    NativeDateModule,
    NativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    HeaderDateManagerComponent,
  ],
  templateUrl: './grid-month-calendar.component.html',
  styleUrl: './grid-month-calendar.component.scss',
})
export class GridMonthCalendarComponent implements OnInit {
  form: FormGroup;
  fb = inject(FormBuilder);
  months: Month[] = [];
  headerDateManagerComponent = HeaderDateManagerComponent;

  constructor() {
    this.buildMonths();
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.form = new FormGroup({});
    this.months.forEach((month) => {
      this.form.addControl(
        month.date,
        new FormGroup({
          date: new FormControl(''),
          initial: new FormControl(month.initial),
          start: new FormControl(''),
          end: new FormControl(''),
        })
      );
    });
  }

  private buildMonths(): void {
    for (let i = 0; i < 12; i++) {
      this.months.push({
        date: moment().month(i).format('MMMM'),
        initial: moment().month(i).format('YYYY-MM-DD'),
      });
    }
  }
}
