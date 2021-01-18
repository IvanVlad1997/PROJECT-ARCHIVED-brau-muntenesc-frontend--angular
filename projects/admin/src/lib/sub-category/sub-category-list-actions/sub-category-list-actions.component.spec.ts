import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryListActionsComponent } from './sub-category-list-actions.component';

describe('SubCategoryListActionsComponent', () => {
  let component: SubCategoryListActionsComponent;
  let fixture: ComponentFixture<SubCategoryListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
