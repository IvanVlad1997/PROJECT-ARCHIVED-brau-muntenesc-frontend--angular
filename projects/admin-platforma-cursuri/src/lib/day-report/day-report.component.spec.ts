import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayReportComponent } from './day-report.component';

describe('DayReportComponent', () => {
  let component: DayReportComponent;
  let fixture: ComponentFixture<DayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
