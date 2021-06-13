import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastIconsComponent } from './last-icons.component';

describe('LastIconsComponent', () => {
  let component: LastIconsComponent;
  let fixture: ComponentFixture<LastIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
