import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPhotoListComponent } from './carousel-photo-list.component';

describe('CarouselPhotoListComponent', () => {
  let component: CarouselPhotoListComponent;
  let fixture: ComponentFixture<CarouselPhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPhotoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
