import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursantiCalendarComponent } from './cursanti-calendar.component';

describe('CursantiCalendarComponent', () => {
  let component: CursantiCalendarComponent;
  let fixture: ComponentFixture<CursantiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursantiCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursantiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
