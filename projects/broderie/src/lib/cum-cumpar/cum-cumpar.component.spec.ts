import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumCumparComponent } from './cum-cumpar.component';

describe('CumCumparComponent', () => {
  let component: CumCumparComponent;
  let fixture: ComponentFixture<CumCumparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumCumparComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumCumparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
