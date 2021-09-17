import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaBigComponent } from './cta-big.component';

describe('CtaBigComponent', () => {
  let component: CtaBigComponent;
  let fixture: ComponentFixture<CtaBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaBigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
