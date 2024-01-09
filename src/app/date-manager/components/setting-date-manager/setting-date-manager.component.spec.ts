import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDateManagerComponent } from './setting-date-manager.component';

describe('SettingDateManagerComponent', () => {
  let component: SettingDateManagerComponent;
  let fixture: ComponentFixture<SettingDateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingDateManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingDateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
