import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponListActionsComponent } from './cupon-list-actions.component';

describe('CuponListActionsComponent', () => {
  let component: CuponListActionsComponent;
  let fixture: ComponentFixture<CuponListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
