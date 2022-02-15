import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TokenTableDataSource } from './token-table-datasource';
import { TokenTableItem } from '../token';
import { TokenService } from '../token-service.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.css']
})
export class TokenTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TokenTableItem>;
  dataSource: TokenTableDataSource;

  DEFAULT_ORDER: SortDirection = 'asc';
  DEFAULT_SORT_FIELD = 'tokenName';
  DEFAULT_PAGE_SIZE = 20;


  @Input()
  searchKeyword = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tokenId', 'tokenName', 'tokenSymbol', 'decimals', 'totalSupply', 'owner'];

  constructor(private tokenService: TokenService,
    private router: Router) {
    this.dataSource = new TokenTableDataSource(tokenService);
  }

  ngOnInit(): void {
    this.dataSource.loadTokens(this.DEFAULT_ORDER,
      this.DEFAULT_SORT_FIELD, 0, this.DEFAULT_PAGE_SIZE);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadTokens())
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.searchKeyword.currentValue && this.loadTokens();
    if (changes.searchKeyword.currentValue || (changes.searchKeyword.currentValue === '' && changes.searchKeyword.previousValue)) {
      this.paginator.pageIndex = 0;
      this.loadTokens();
    }
  }

  loadTokens(): void {
    this.dataSource.loadTokens(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.searchKeyword
    );
  }

  gotoTransactionDetail(tokenId: string) {
    this.router.navigate(['token', tokenId]);
  }
}
