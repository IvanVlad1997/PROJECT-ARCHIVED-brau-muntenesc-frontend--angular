import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoDialogComponent } from './app-info-dialog.component';

describe('AppInfoDialogComponent', () => {
  let component: AppInfoDialogComponent;
  let fixture: ComponentFixture<AppInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
