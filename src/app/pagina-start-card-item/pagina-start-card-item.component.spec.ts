import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaStartCardItemComponent } from './pagina-start-card-item.component';

describe('PaginaStartCardItemComponent', () => {
  let component: PaginaStartCardItemComponent;
  let fixture: ComponentFixture<PaginaStartCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaStartCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaStartCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
