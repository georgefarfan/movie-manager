import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendarHeader } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-picker.component.html',
  styleUrl: './header-picker.component.scss',
})
export class HeaderPickerComponent extends MatCalendarHeader<any> {
  get periodLabel() {
    return this.calendar.activeDate.year();
  }
}
