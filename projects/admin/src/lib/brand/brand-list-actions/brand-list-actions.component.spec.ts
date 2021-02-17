import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListActionsComponent } from './brand-list-actions.component';

describe('BrandListActionsComponent', () => {
  let component: BrandListActionsComponent;
  let fixture: ComponentFixture<BrandListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
