import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursuriComponent } from './cursuri.component';

describe('CursuriComponent', () => {
  let component: CursuriComponent;
  let fixture: ComponentFixture<CursuriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursuriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
