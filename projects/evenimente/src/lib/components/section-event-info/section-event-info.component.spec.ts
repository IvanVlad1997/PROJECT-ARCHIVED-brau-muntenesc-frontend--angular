import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEventInfoComponent } from './section-event-info.component';

describe('SectionEventInfoComponent', () => {
  let component: SectionEventInfoComponent;
  let fixture: ComponentFixture<SectionEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEventInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
