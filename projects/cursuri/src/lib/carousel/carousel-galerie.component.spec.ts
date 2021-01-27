import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGalerieComponent } from './carousel-galerie.component';

describe('CarouselComponent', () => {
  let component: CarouselGalerieComponent;
  let fixture: ComponentFixture<CarouselGalerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselGalerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
