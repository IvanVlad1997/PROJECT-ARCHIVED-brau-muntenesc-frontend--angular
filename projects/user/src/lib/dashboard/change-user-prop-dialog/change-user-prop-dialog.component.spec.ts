import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPropDialogComponent } from './change-user-prop-dialog.component';

describe('ChangeUserPropDialogComponent', () => {
  let component: ChangeUserPropDialogComponent;
  let fixture: ComponentFixture<ChangeUserPropDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserPropDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserPropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
