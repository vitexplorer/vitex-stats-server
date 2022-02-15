import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

/**
 * Data source for the TransactionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TransactionTableDataSource extends DataSource<Transaction> {
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

  loadTransactions(
    accountAddress: string = '',
    filter: string = '',
    sortOrder: string = 'desc',
    sortColumn: string = 'timestamp',
    pageIndex: number = 0,
    pageSize: number = 20
  ): void {
    this.loadingSubject.next(true);

    if (accountAddress) {
      if (filter == 'unreceived') {
        // unreceived account transacitons, for account detail page
        this.transactionService.getAccountUnreceivedTransactions(accountAddress, pageIndex, pageSize, sortOrder, sortColumn)
          .pipe(
            catchError(() => of({
              'accountBlocks': [],
              "count": 0,
              "err": "error",
              "pageIdx": pageIndex,
              "pageSize": pageSize
            })),
            finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(
            transactionPage => {
              this.transactionSubject.next(transactionPage.accountBlocks);
              this.transactionCount = transactionPage.count;
            }
          );

      } else {
        this.transactionService.getAccountTransactions(accountAddress, pageIndex, pageSize, sortOrder, sortColumn)
          .pipe(
            catchError(() => of({
              'accountBlocks': [],
              "count": 0,
              "err": "error",
              "pageIdx": pageIndex,
              "pageSize": pageSize
            })),
            finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(
            transactionPage => {
              this.transactionSubject.next(transactionPage.accountBlocks);
              this.transactionCount = transactionPage.count;
            }
          );

      }
      return;
    }



    this.transactionService.getTransactions(pageIndex, pageSize, sortOrder, sortColumn)
      .pipe(
        catchError(() => of({
          'accountBlocks': [],
          "count": 0,
          "err": "error",
          "pageIdx": pageIndex,
          "pageSize": pageSize
        })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        transactionPage => {
          this.transactionSubject.next(transactionPage.accountBlocks);
          this.transactionCount = transactionPage.count;
        }
      );
  }
}
