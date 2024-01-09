import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridMonthCalendarComponent } from './components/grid-month-calendar/grid-month-calendar.component';
import { SettingDateManagerComponent } from './components/setting-date-manager/setting-date-manager.component';

@Component({
  selector: 'app-date-manager',
  standalone: true,
  imports: [
    CommonModule,
    GridMonthCalendarComponent,
    SettingDateManagerComponent,
  ],
  templateUrl: './date-manager.component.html',
  styleUrl: './date-manager.component.scss',
})
export class DateManagerComponent {}
