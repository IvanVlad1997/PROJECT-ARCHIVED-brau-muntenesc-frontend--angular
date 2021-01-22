import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsVideoListComponent } from './events-video-list.component';

describe('EventsVideoListComponent', () => {
  let component: EventsVideoListComponent;
  let fixture: ComponentFixture<EventsVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
