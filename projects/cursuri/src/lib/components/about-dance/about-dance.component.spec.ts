import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDanceComponent } from './about-dance.component';

describe('AboutDanceComponent', () => {
  let component: AboutDanceComponent;
  let fixture: ComponentFixture<AboutDanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
