import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPriceTrendComponent } from './dashboard-price-trend.component';

describe('DashboardPriceTrendComponent', () => {
  let component: DashboardPriceTrendComponent;
  let fixture: ComponentFixture<DashboardPriceTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPriceTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPriceTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
