import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacFormListComponent } from './contac-form-list.component';

describe('ContacFormListComponent', () => {
  let component: ContacFormListComponent;
  let fixture: ComponentFixture<ContacFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContacFormListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
