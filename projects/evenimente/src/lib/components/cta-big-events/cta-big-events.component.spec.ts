import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaBigEventsComponent } from './cta-big-events.component';

describe('CtaBigEventsComponent', () => {
  let component: CtaBigEventsComponent;
  let fixture: ComponentFixture<CtaBigEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaBigEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaBigEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
