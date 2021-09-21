import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetInstructorsComponent } from './meet-instructors.component';

describe('MeetInstructorsComponent', () => {
  let component: MeetInstructorsComponent;
  let fixture: ComponentFixture<MeetInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetInstructorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
