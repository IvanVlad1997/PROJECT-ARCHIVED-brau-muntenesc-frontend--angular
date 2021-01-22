import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursantiListActionsComponent } from './cursanti-list-actions.component';

describe('CursantiListActionsComponent', () => {
  let component: CursantiListActionsComponent;
  let fixture: ComponentFixture<CursantiListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursantiListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursantiListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
