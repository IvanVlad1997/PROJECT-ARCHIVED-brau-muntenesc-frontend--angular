import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteneriMediaComponent } from './parteneri-media.component';

describe('ParteneriMediaComponent', () => {
  let component: ParteneriMediaComponent;
  let fixture: ComponentFixture<ParteneriMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParteneriMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteneriMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
