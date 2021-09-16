import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardsFlipComponent } from './info-cards-flip.component';

describe('InfoCardsFlipComponent', () => {
  let component: InfoCardsFlipComponent;
  let fixture: ComponentFixture<InfoCardsFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardsFlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardsFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
