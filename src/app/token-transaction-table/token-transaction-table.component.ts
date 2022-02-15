import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { TokenTransactionTableDataSource } from './token-transaction-table-datasource';

@Component({
  selector: 'app-token-transaction-table',
  templateUrl: './token-transaction-table.component.html',
  styleUrls: ['./token-transaction-table.component.scss']
})
export class TokenTransactionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Transaction>;
  dataSource: TokenTransactionTableDataSource;

  tokenId: string = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['timestamp', 'amount', 'fee', 'fromAddress', 'toAddress', 'confirmations', 'status', 'hash', 'snapshotHash'];

  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router) {
    this.dataSource = new TokenTransactionTableDataSource(transactionService);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTokenTransaction())
      )
      .subscribe();

    this.route.params.subscribe(
      params => {
        this.tokenId = params['id'];
        this.loadTokenTransaction();
      }
    )

  }

  loadTokenTransaction(): void {
    if (this.tokenId == '') {
      return
    }
    this.dataSource.loadTransaction(this.tokenId, this.sort.direction,
      this.sort.active, this.paginator.pageIndex, this.paginator.pageSize);
  }

  gotoTransactionDetail(hash: string) {
    this.router.navigate(['transaction', hash]);
  }

  transactionStatus(transaction: Transaction): string {
    if ([1, 2, 3, 6].includes(transaction.blockType) &&
      (transaction.receiveBlockHash.length > 0) && (transaction.receiveBlockHeight > 0)) {
      return 'Closed';
    }

    return 'Open';
  }
}
