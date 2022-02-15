import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { VitexAccount } from '../account';
import { AccountService } from '../account.service';


/**
 * Data source for the AddressTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AddressTableDataSource extends DataSource<VitexAccount> {
  data: VitexAccount[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  accountsCount: number = 10000;

  private accountSubject = new BehaviorSubject<VitexAccount[]>([]);
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
  connect(): Observable<VitexAccount[]> {
    return this.accountSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.accountSubject.complete();
    this.loadingSubject.complete();
  }

  loadAccounts(filter: string = '',
    sortOrder: string = 'desc',
    sortColumn: string = 'viteBalance',
    pageIndex: number = 0,
    pageSize: number = 20): void {

    this.loadingSubject.next(true);

    // valid address starts with "vite_"
    if (filter.startsWith('vite_')) {
      this.accountService.searchAccountsByAddress(filter, sortOrder, sortColumn, pageIndex, pageSize)
        .pipe(
          catchError(() => of({ accounts: [], count: 0 })),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(
          accountsPage => {
            this.accountSubject.next(accountsPage.accounts);
            this.accountsCount = accountsPage.count;
          }
        );

      return;
    }

    this.accountService.getAccountsByPage(sortOrder, sortColumn, pageIndex, pageSize)
      .pipe(
        catchError(() => of({ accounts: [], count: 0 })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        accountsPage => {
          this.accountSubject.next(accountsPage.accounts);
          this.accountsCount = accountsPage.count;
        }
      );

  }

}
