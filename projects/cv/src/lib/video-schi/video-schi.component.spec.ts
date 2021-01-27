import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSchiComponent } from './video-schi.component';

describe('VideoSchiComponent', () => {
  let component: VideoSchiComponent;
  let fixture: ComponentFixture<VideoSchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
