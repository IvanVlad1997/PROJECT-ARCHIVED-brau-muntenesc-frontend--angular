import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrozenLogicComponent } from './frozen-logic.component';

describe('FrozenLogicComponent', () => {
  let component: FrozenLogicComponent;
  let fixture: ComponentFixture<FrozenLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrozenLogicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrozenLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
