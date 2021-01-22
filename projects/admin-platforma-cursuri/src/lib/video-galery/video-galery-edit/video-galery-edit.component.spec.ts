import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGaleryEditComponent } from './video-galery-edit.component';

describe('VideoGaleryEditComponent', () => {
  let component: VideoGaleryEditComponent;
  let fixture: ComponentFixture<VideoGaleryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGaleryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGaleryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
