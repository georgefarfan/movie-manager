import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPickerComponent } from './header-picker.component';

describe('HeaderPickerComponent', () => {
  let component: HeaderPickerComponent;
  let fixture: ComponentFixture<HeaderPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
