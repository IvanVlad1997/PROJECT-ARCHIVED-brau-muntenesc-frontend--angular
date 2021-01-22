import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursantiListComponent } from './cursanti-list.component';

describe('CursantiListComponent', () => {
  let component: CursantiListComponent;
  let fixture: ComponentFixture<CursantiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursantiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursantiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
