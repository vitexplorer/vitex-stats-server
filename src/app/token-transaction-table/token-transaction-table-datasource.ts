import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';


/**
 * Data source for the TokenTransactionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TokenTransactionTableDataSource extends DataSource<Transaction> {
  data: Transaction[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  transactionCount: number = 0;
  private transactionSubject = new BehaviorSubject<Transaction[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();


  constructor(private transactionService: TransactionService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Transaction[]> {
    return this.transactionSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.transactionSubject.complete();
    this.loadingSubject.complete();
  }

  loadTransaction(
    tokenId: string = '',
    sortOrder: string = 'desc',
    sortColumn: string = '',
    pageIndex: number = 0,
    pageSize: number = 20) {
    this.loadingSubject.next(true);

    if (sortOrder == '') {
      sortOrder = 'desc';
    }
    if (sortColumn == '') {
      sortColumn = 'timestamp';
    }

    this.transactionService.getTokenTransactions(tokenId, pageIndex, pageSize, sortOrder, sortColumn)
      .pipe(
        catchError(() => of({
          "count": 0,
          "err": "error",
          "pageIdx": pageIndex,
          "pageSize": pageSize,
          "accountBlocks": []
        })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        pageTransaction => {
          this.transactionSubject.next(pageTransaction.accountBlocks);
          this.transactionCount = pageTransaction.count;
        }

      )
  }

}
