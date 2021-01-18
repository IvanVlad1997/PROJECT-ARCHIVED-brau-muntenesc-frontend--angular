import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductCountComponent } from './cart-product-count.component';

describe('CartProductCountComponent', () => {
  let component: CartProductCountComponent;
  let fixture: ComponentFixture<CartProductCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
