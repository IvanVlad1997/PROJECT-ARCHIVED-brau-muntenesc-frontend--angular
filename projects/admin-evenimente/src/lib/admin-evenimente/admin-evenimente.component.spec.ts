import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvenimenteComponent } from './admin-evenimente.component';

describe('AdminEvenimenteComponent', () => {
  let component: AdminEvenimenteComponent;
  let fixture: ComponentFixture<AdminEvenimenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEvenimenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvenimenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
