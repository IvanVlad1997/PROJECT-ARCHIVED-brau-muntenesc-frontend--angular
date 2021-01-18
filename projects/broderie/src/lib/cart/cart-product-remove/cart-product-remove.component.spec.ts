import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductRemoveComponent } from './cart-product-remove.component';

describe('CartProductRemoveComponent', () => {
  let component: CartProductRemoveComponent;
  let fixture: ComponentFixture<CartProductRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
