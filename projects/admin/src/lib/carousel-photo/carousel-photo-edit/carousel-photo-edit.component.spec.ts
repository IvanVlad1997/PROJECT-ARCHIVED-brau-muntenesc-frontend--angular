import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPhotoEditComponent } from './carousel-photo-edit.component';

describe('CarouselPhotoEditComponent', () => {
  let component: CarouselPhotoEditComponent;
  let fixture: ComponentFixture<CarouselPhotoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPhotoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
