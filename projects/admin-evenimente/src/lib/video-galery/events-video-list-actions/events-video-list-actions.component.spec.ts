import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVideoListActionsComponent } from './events-video-list-actions.component';

describe('EventsVideoListActionsComponent', () => {
  let component: EventsVideoListActionsComponent;
  let fixture: ComponentFixture<EventsVideoListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsVideoListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsVideoListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
