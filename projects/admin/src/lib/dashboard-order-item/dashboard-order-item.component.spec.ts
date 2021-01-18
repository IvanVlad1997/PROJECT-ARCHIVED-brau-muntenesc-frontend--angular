import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderItemComponent } from './dashboard-order-item.component';

describe('DashboardOrderItemComponent', () => {
  let component: DashboardOrderItemComponent;
  let fixture: ComponentFixture<DashboardOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
