import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalaComponent } from './pagina-principala.component';

describe('PaginaPrincipalaComponent', () => {
  let component: PaginaPrincipalaComponent;
  let fixture: ComponentFixture<PaginaPrincipalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrincipalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
