import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCoursesVideoComponent } from './header-courses-video.component';

describe('HeaderCoursesVideoComponent', () => {
  let component: HeaderCoursesVideoComponent;
  let fixture: ComponentFixture<HeaderCoursesVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCoursesVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCoursesVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
