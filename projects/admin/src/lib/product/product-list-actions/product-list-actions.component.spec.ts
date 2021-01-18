import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListActionsComponent } from './product-list-actions.component';

describe('ProductListActionsComponent', () => {
  let component: ProductListActionsComponent;
  let fixture: ComponentFixture<ProductListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
