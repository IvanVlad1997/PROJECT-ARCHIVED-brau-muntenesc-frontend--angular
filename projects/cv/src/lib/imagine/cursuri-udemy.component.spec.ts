import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursuriUdemyComponent } from './cursuri-udemy.component';

describe('CursuriUdemyComponent', () => {
  let component: CursuriUdemyComponent;
  let fixture: ComponentFixture<CursuriUdemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursuriUdemyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursuriUdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
