import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryTextComponent } from './gallery-text.component';

describe('GalleryTextComponent', () => {
  let component: GalleryTextComponent;
  let fixture: ComponentFixture<GalleryTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
