import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlatformaCursuriComponent } from './admin-platforma-cursuri.component';

describe('AdminPlatformaCursuriComponent', () => {
  let component: AdminPlatformaCursuriComponent;
  let fixture: ComponentFixture<AdminPlatformaCursuriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlatformaCursuriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlatformaCursuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
