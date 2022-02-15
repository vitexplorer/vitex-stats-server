import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnapshotService } from '../snapshot.service';
import { Transaction } from '../transaction';
import { SnapshotTableDataSource } from './snapshot-table-datasource';

@Component({
  selector: 'app-snapshot-table',
  templateUrl: './snapshot-table.component.html',
  styleUrls: ['./snapshot-table.component.scss']
})
export class SnapshotTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Transaction>;
  dataSource: SnapshotTableDataSource;

  @Input()
  account: string = '';

  displayedColumns = ['hash', 'producer', 'timestamp'];
  constructor(private snapshotService: SnapshotService) {
    this.dataSource = new SnapshotTableDataSource(snapshotService);
  }

  ngOnInit(): void {
    this.dataSource.loadSnapshot(this.account);
  }

  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAccountSnapshots())
      )
      .subscribe();
  }

  loadAccountSnapshots() {
    this.dataSource.loadSnapshot(
      this.account,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


}
