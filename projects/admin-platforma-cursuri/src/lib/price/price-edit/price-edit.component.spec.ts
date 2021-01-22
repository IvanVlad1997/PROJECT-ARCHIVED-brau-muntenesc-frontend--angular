import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEditComponent } from './price-edit.component';

describe('PriceEditComponent', () => {
  let component: PriceEditComponent;
  let fixture: ComponentFixture<PriceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
