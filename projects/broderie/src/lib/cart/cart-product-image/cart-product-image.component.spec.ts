import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductImageComponent } from './cart-product-image.component';

describe('CartProductImageComponent', () => {
  let component: CartProductImageComponent;
  let fixture: ComponentFixture<CartProductImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
