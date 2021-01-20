import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformaCursuriComponent } from './platforma-cursuri.component';

describe('PlatformaCursuriComponent', () => {
  let component: PlatformaCursuriComponent;
  let fixture: ComponentFixture<PlatformaCursuriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformaCursuriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformaCursuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
