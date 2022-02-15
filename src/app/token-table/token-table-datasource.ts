import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';

import { TokenTableItem } from '../token';
import { TokenService } from '../token-service.service';

/**
 * Data source for the TokenTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TokenTableDataSource extends DataSource<TokenTableItem> {
  data: TokenTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  tokenCount: number = 0;

  private tokenSubject = new BehaviorSubject<TokenTableItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private tokenService: TokenService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TokenTableItem[]> {
    return this.tokenSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.tokenSubject.complete();
    this.loadingSubject.complete();
  }

  loadTokens(
    sortOrder: string = 'asc',
    sortColumn: string = '',
    pageIndex: number = 0,
    pageSize: number = 20,
    searchKeyword: string = ''
  ): void {
    this.loadingSubject.next(true);

    if (sortOrder == '') {
      sortOrder = 'asc';
    }

    if (sortColumn == '') {
      sortColumn = 'tokenName';
    }

    this.tokenService.getTokenTableItems(sortOrder, sortColumn, pageIndex, pageSize, searchKeyword)
      .pipe(
        catchError(() => of({ 'tokenInfoList': [], 'totalCount': 0 })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        tokenList => {
          this.tokenSubject.next(tokenList.tokenInfoList);
          this.tokenCount = tokenList.totalCount;
        }

      )
  }


}
