import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceActionsListComponent } from './price-actions-list.component';

describe('PriceActionsListComponent', () => {
  let component: PriceActionsListComponent;
  let fixture: ComponentFixture<PriceActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceActionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
