import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListEditComponent } from './video-list-edit.component';

describe('VideoListEditComponent', () => {
  let component: VideoListEditComponent;
  let fixture: ComponentFixture<VideoListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoListEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
