import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCardsComponent } from './education-cards.component';

describe('EducationCardsComponent', () => {
  let component: EducationCardsComponent;
  let fixture: ComponentFixture<EducationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
