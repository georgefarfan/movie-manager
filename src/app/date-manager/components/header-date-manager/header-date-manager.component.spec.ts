import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDateManagerComponent } from './header-date-manager.component';

describe('HeaderDateManagerComponent', () => {
  let component: HeaderDateManagerComponent;
  let fixture: ComponentFixture<HeaderDateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDateManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderDateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
