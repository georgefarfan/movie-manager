import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersManageComponent } from './filters-manage.component';

describe('FiltersManageComponent', () => {
  let component: FiltersManageComponent;
  let fixture: ComponentFixture<FiltersManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
