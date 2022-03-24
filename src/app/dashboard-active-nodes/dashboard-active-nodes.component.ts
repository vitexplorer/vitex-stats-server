import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SBP } from '../sbp';
import { SbpService } from '../sbp.service';

@Component({
  selector: 'app-dashboard-active-nodes',
  templateUrl: './dashboard-active-nodes.component.html',
  styleUrls: ['./dashboard-active-nodes.component.css']
})
export class DashboardActiveNodesComponent implements OnInit {
  nodes: SBP[] = [];
  refreshProgress: number = 100;
  private updateSub: Subscription | null = null;

  constructor(private router: Router, private sbpService: SbpService) { }

  ngOnInit(): void {
    this.updateSub = interval(1300).subscribe((val) => {
      this.refresh();
    });
  }

  refresh(): void {
    if (this.refreshProgress < 100) {
      this.refreshProgress = this.refreshProgress + 20;
      return
    }
    this.refreshProgress = 0;
    this.sbpService.getActiveSBP().subscribe(
      sbps => this.nodes = sbps
    );
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  gotoAddressDetail(address: string) {
    this.router.navigate(['address', address]);
  }

  gotoSBPList() {
    this.router.navigate(['sbp']);
  }
}
