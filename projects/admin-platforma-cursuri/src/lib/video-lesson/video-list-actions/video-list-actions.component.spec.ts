import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListActionsComponent } from './video-list-actions.component';

describe('VideoListActionsComponent', () => {
  let component: VideoListActionsComponent;
  let fixture: ComponentFixture<VideoListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
