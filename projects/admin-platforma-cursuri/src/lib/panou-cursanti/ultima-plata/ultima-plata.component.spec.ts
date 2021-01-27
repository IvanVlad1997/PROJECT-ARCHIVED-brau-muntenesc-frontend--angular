import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimaPlataComponent } from './ultima-plata.component';

describe('UltimaPlataComponent', () => {
  let component: UltimaPlataComponent;
  let fixture: ComponentFixture<UltimaPlataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimaPlataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimaPlataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
