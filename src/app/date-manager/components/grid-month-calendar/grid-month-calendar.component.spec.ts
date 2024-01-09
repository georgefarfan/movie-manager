import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMonthCalendarComponent } from './grid-month-calendar.component';

describe('GridMonthCalendarComponent', () => {
  let component: GridMonthCalendarComponent;
  let fixture: ComponentFixture<GridMonthCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridMonthCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridMonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
