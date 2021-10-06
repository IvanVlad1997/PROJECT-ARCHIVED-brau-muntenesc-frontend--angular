import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashboardShopComponent } from './header-dashboard-shop.component';

describe('HeaderDashboardShopComponent', () => {
  let component: HeaderDashboardShopComponent;
  let fixture: ComponentFixture<HeaderDashboardShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDashboardShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDashboardShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
