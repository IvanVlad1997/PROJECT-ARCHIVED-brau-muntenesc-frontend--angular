import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductImageDialogComponent } from './cart-product-image-dialog.component';

describe('CartProductImageDialogComponent', () => {
  let component: CartProductImageDialogComponent;
  let fixture: ComponentFixture<CartProductImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
