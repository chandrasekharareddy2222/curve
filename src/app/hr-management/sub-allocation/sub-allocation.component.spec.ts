import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAllocationComponent } from './sub-allocation.component';

describe('SubAllocationComponent', () => {
  let component: SubAllocationComponent;
  let fixture: ComponentFixture<SubAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
