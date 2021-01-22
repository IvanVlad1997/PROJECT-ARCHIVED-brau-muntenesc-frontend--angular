import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieFotoComponent } from './galerie-foto.component';

describe('GalerieFotoComponent', () => {
  let component: GalerieFotoComponent;
  let fixture: ComponentFixture<GalerieFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalerieFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalerieFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
