import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPayrollComponent } from './staff-payroll.component';

describe('StaffPayrollComponent', () => {
  let component: StaffPayrollComponent;
  let fixture: ComponentFixture<StaffPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
