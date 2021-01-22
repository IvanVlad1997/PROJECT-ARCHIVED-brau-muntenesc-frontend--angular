import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceHistoryComponent } from './presence-history.component';

describe('PresenceHistoryComponent', () => {
  let component: PresenceHistoryComponent;
  let fixture: ComponentFixture<PresenceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
