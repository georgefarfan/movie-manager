import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Filter } from '../../filters';

export interface FilterManagerData {
  filters: Filter[];
  form: FormGroup;
  items: any[];
}

@Component({
  selector: 'app-filters-manage',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FontAwesomeModule,
    MatCheckboxModule,
  ],
  templateUrl: './filters-manage.component.html',
  styleUrl: './filters-manage.component.scss',
})
export class FiltersManageComponent implements OnInit {
  fb = inject(FormBuilder);
  form: FormGroup;

  constructor(
    private library: FaIconLibrary,
    public dialogRef: MatDialogRef<FiltersManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterManagerData
  ) {}

  ngOnInit(): void {
    this.form = this.data.form;
  }

  apply(): void {}
}
