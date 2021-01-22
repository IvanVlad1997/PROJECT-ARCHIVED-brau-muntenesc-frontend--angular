import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGaleryListActionsComponent } from './video-galery-list-actions.component';

describe('VideoGaleryListActionsComponent', () => {
  let component: VideoGaleryListActionsComponent;
  let fixture: ComponentFixture<VideoGaleryListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGaleryListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGaleryListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
