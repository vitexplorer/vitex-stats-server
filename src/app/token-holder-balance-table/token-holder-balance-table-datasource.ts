import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { AccountBalance } from '../account';
import { AccountService } from '../account.service';

/**
 * Data source for the TokenTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TokenHolderBalanceTableDataSource extends DataSource<AccountBalance> {
  data: AccountBalance[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  balanceCount: number = 0;

  private balanceSubject = new BehaviorSubject<AccountBalance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private accountService: AccountService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AccountBalance[]> {
    return this.balanceSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.balanceSubject.complete();
    this.loadingSubject.complete();
  }

  loadBalances(
    tokenId: string,
    pageIndex: number = 0,
    pageSize: number = 20
  ): void {
    this.loadingSubject.next(true);

    this.accountService.getTopTokenHoldersBalances(tokenId, pageIndex, pageSize)
      .pipe(
        catchError(() => of({
          'count': 0,
          'err': 'HTTP Error',
          'pageIdx': pageIndex,
          'pageSize': pageSize,
          'balances': []
        })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        tokenAccountBalances => {
          this.balanceSubject.next(tokenAccountBalances.balances);
          this.balanceCount = tokenAccountBalances.count;
        }

      )
  }


}
