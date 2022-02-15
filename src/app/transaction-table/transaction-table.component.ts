import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Transaction, transactionStatus } from '../transaction';
import { TransactionService } from '../transaction.service';
import { TransactionTableDataSource } from './transaction-table-datasource';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Transaction>;
  dataSource: TransactionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input()
  displayedColumns = ['timestamp', 'tokenSymbol', 'amount', 'fromAddress', 'toAddress', 'confirmations', 'status', 'hash', 'note'];

  @Input()
  accountAddress: string = '';

  @Input()
  filter: string = '';

  @Input()
  sortable: boolean = true;

  constructor(private transactionService: TransactionService,
    private router: Router) {
    this.dataSource = new TransactionTableDataSource(transactionService);
  }

  ngOnInit(): void {
    this.dataSource.loadTransactions(this.accountAddress, this.filter, 'desc', 'timestamp', 0, 20);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTransactions())
      )
      .subscribe();
  }

  gotoTransactionDetail(hash: string) {
    this.router.navigate(['transaction', hash]);
  }

  loadTransactions(): void {
    let sortOrder: string = this.sort.direction ? this.sort.direction : 'desc';
    let sortColumn: string = this.sort.active ? this.sort.active : 'timestamp';
    this.dataSource.loadTransactions(
      this.accountAddress,
      this.filter,
      sortOrder,
      sortColumn,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  getTransactionStatus(transaction: Transaction): string {
    return transactionStatus(transaction);
  }
}
