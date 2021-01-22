import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursantiPayComponent } from './cursanti-pay.component';

describe('CursantiPayComponent', () => {
  let component: CursantiPayComponent;
  let fixture: ComponentFixture<CursantiPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursantiPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursantiPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
