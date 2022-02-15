import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Snapshot } from '../snapshot';
import { SnapshotService } from '../snapshot.service';

@Component({
  selector: 'app-dashboard-snapshot',
  templateUrl: './dashboard-snapshot.component.html',
  styleUrls: ['./dashboard-snapshot.component.css']
})
export class DashboardSnapshotComponent implements OnInit {
  snapshots: Snapshot[] = [];
  refreshProgress: number = 100;
  private updateSub: Subscription | null = null;

  constructor(private snapshotService: SnapshotService) { }

  ngOnInit(): void {
    this.refresh();
    this.updateSub = interval(1500).subscribe((val) => {
      this.refresh();
    });
  }

  refresh(): void {
    if (this.refreshProgress < 100) {
      this.refreshProgress = this.refreshProgress + 20;
      return
    }
    this.refreshProgress = 0;
    this.snapshotService.getLatestSnapshots().subscribe(
      snapshotPage => {
        if (snapshotPage.err != 'ok') {
          this.snapshots = [];
        } else {
          this.snapshots = snapshotPage.snapshotBlocks;
        }
      }
    );
  }

}
