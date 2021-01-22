import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVideoEditComponent } from './events-video-edit.component';

describe('EventsVideoEditComponent', () => {
  let component: EventsVideoEditComponent;
  let fixture: ComponentFixture<EventsVideoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsVideoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsVideoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
