import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularEvenimenteComponent } from './formular-evenimente.component';

describe('FormularEvenimenteComponent', () => {
  let component: FormularEvenimenteComponent;
  let fixture: ComponentFixture<FormularEvenimenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularEvenimenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularEvenimenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
