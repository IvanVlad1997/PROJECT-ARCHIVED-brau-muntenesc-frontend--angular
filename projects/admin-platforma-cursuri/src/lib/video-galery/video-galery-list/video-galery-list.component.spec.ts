import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGaleryListComponent } from './video-galery-list.component';

describe('VideoGaleryListComponent', () => {
  let component: VideoGaleryListComponent;
  let fixture: ComponentFixture<VideoGaleryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGaleryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGaleryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
