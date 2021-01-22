import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramActionsListComponent } from './program-actions-list.component';

describe('ProgramActionsListComponent', () => {
  let component: ProgramActionsListComponent;
  let fixture: ComponentFixture<ProgramActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramActionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
