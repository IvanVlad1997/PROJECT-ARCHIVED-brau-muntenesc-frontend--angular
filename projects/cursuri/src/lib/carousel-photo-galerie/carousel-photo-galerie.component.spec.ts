import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPhotoGalerieComponent } from './carousel-photo-galerie.component';

describe('CarouselPhotoGalerieComponent', () => {
  let component: CarouselPhotoGalerieComponent;
  let fixture: ComponentFixture<CarouselPhotoGalerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPhotoGalerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPhotoGalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
