import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListByCategoryComponent } from './product-list-by-category.component';

describe('ListaProduseComponent', () => {
  let component: ProductListByCategoryComponent;
  let fixture: ComponentFixture<ProductListByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
