import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroderieComponent } from './broderie.component';

describe('BroderieComponent', () => {
  let component: BroderieComponent;
  let fixture: ComponentFixture<BroderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroderieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
