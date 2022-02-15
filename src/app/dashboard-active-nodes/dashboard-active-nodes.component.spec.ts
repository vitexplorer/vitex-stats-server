import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActiveNodesComponent } from './dashboard-active-nodes.component';

describe('DashboardActiveNodesComponent', () => {
  let component: DashboardActiveNodesComponent;
  let fixture: ComponentFixture<DashboardActiveNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardActiveNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardActiveNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
