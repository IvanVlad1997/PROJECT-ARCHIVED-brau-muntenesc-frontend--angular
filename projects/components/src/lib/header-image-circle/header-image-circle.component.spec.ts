import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImageCircleComponent } from './header-image-circle.component';

describe('HeaderImageCircleComponent', () => {
  let component: HeaderImageCircleComponent;
  let fixture: ComponentFixture<HeaderImageCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderImageCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImageCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
