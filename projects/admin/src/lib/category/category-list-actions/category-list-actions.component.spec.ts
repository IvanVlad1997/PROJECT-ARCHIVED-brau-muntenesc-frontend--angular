import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListActionsComponent } from './category-list-actions.component';

describe('CategoryListActionsComponent', () => {
  let component: CategoryListActionsComponent;
  let fixture: ComponentFixture<CategoryListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
