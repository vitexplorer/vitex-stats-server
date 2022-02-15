import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { SBP, SBPOnlineRate } from '../sbp';

import { SbpService } from '../sbp.service';

@Component({
  selector: 'app-sbp-table',
  templateUrl: './sbp-table.component.html',
  styleUrls: ['./sbp-table.component.css']
})
export class SbpTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<SBP> = new MatTableDataSource<SBP>();

  displayedColumns = ['rank', 'name', 'producingAddr', 'stakeAddr', 'voteNum', 'online'];

  constructor(private router: Router,
    private sbpService: SbpService,
    private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.sbpService.getSBP().subscribe(
      tableItems => {
        this.dataSource.data = tableItems;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onlineRate(sbp: SBP): number {
    return SBPOnlineRate(sbp);
  }

  gotoAddressDetail(address: string) {
    this.router.navigate(['address', address]);
  }
}
