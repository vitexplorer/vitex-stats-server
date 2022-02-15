import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMarketcapComponent } from './dashboard-marketcap.component';

describe('DashboardMarketcapComponent', () => {
  let component: DashboardMarketcapComponent;
  let fixture: ComponentFixture<DashboardMarketcapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMarketcapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMarketcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
