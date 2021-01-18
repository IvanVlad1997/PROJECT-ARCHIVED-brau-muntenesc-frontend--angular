import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponListComponent } from './cupon-list.component';

describe('CuponListComponent', () => {
  let component: CuponListComponent;
  let fixture: ComponentFixture<CuponListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
