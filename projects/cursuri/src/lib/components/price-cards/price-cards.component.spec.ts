import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCardsComponent } from './price-cards.component';

describe('PriceCardsComponent', () => {
  let component: PriceCardsComponent;
  let fixture: ComponentFixture<PriceCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
