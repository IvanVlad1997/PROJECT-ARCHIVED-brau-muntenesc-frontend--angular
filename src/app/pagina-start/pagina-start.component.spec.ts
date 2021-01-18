import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaStartComponent } from './pagina-start.component';

describe('PaginaStartComponent', () => {
  let component: PaginaStartComponent;
  let fixture: ComponentFixture<PaginaStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
