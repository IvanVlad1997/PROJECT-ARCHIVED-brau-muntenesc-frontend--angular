import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardFlipComponent } from './info-card-flip.component';

describe('InfoCardFlipComponent', () => {
  let component: InfoCardFlipComponent;
  let fixture: ComponentFixture<InfoCardFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardFlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
