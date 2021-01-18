import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponEditComponent } from './cupon-edit.component';

describe('CuponEditComponent', () => {
  let component: CuponEditComponent;
  let fixture: ComponentFixture<CuponEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
