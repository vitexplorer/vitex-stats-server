import { Component, OnInit } from '@angular/core';
import { SBP } from '../sbp';
import { SbpService } from '../sbp.service';

@Component({
  selector: 'app-dashboard-active-nodes',
  templateUrl: './dashboard-active-nodes.component.html',
  styleUrls: ['./dashboard-active-nodes.component.css']
})
export class DashboardActiveNodesComponent implements OnInit {
  nodes: SBP[] = [];
  constructor(private sbpService: SbpService) { }

  ngOnInit(): void {
    this.sbpService.getActiveSBP().subscribe(
      sbps => this.nodes = sbps
    );
  }

}
