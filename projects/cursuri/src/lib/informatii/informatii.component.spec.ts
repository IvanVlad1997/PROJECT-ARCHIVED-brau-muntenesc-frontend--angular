import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformatiiComponent } from './informatii.component';

describe('InformatiiComponent', () => {
  let component: InformatiiComponent;
  let fixture: ComponentFixture<InformatiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformatiiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformatiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
