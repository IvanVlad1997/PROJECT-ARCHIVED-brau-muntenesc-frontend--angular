import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieVideoComponent } from './galerie-video.component';

describe('GalerieVideoComponent', () => {
  let component: GalerieVideoComponent;
  let fixture: ComponentFixture<GalerieVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalerieVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalerieVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
