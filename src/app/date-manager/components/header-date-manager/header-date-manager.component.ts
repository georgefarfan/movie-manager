import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendarHeader } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
  selector: 'app-header-date-manager',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-date-manager.component.html',
  styleUrl: './header-date-manager.component.scss',
})
export class HeaderDateManagerComponent extends MatCalendarHeader<any> {
  get periodLabel() {
    return moment(this.calendar.activeDate).format('MMMM');
  }
}
