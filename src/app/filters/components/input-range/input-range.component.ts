import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface RangeConfig {
  min: number;
  max: number;
  label: string;
  step: number;
}
@Component({
  selector: 'app-input-range',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-range.component.html',
  styleUrl: './input-range.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRangeComponent),
      multi: true,
    },
  ],
})
export class InputRangeComponent {
  @Input()
  config: RangeConfig;

  @Input()
  range: FormGroup;
}
