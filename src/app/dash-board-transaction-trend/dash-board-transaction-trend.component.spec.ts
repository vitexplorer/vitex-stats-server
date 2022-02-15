import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardTransactionTrendComponent } from './dash-board-transaction-trend.component';

describe('DashBoardTransactionTrendComponent', () => {
  let component: DashBoardTransactionTrendComponent;
  let fixture: ComponentFixture<DashBoardTransactionTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardTransactionTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardTransactionTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
