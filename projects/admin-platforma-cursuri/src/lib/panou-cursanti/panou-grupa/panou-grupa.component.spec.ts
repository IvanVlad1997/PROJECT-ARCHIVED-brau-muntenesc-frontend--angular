import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanouGrupaComponent } from './panou-grupa.component';

describe('PanouGrupaComponent', () => {
  let component: PanouGrupaComponent;
  let fixture: ComponentFixture<PanouGrupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanouGrupaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanouGrupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
