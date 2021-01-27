import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProiecteProgramareComponent } from './proiecte-programare.component';

describe('ProiecteProgramareComponent', () => {
  let component: ProiecteProgramareComponent;
  let fixture: ComponentFixture<ProiecteProgramareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProiecteProgramareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProiecteProgramareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
