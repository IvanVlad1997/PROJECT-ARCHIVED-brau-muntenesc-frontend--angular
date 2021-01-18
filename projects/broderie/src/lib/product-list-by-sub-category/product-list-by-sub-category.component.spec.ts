import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListBySubCategoryComponent } from './product-list-by-sub-category.component';

describe('ProductListBySubCategoryComponent', () => {
  let component: ProductListBySubCategoryComponent;
  let fixture: ComponentFixture<ProductListBySubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListBySubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListBySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
