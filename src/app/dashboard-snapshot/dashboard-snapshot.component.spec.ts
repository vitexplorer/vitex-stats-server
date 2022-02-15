import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSnapshotComponent } from './dashboard-snapshot.component';

describe('DashboardSnapshotComponent', () => {
  let component: DashboardSnapshotComponent;
  let fixture: ComponentFixture<DashboardSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
