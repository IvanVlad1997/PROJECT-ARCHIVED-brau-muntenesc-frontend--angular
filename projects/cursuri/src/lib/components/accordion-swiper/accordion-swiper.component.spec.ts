import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSwiperComponent } from './accordion-swiper.component';

describe('AccordionSwiperComponent', () => {
  let component: AccordionSwiperComponent;
  let fixture: ComponentFixture<AccordionSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
