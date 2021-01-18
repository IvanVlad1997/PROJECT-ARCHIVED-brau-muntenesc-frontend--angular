import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryProductsTableComponent } from './user-history-products-table.component';

describe('UserHistoryProductsTableComponent', () => {
  let component: UserHistoryProductsTableComponent;
  let fixture: ComponentFixture<UserHistoryProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHistoryProductsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
