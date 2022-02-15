import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountBalance } from '../account';
import { AccountService } from '../account.service';
import { TokenHolderBalanceTableDataSource } from './token-holder-balance-table-datasource';

@Component({
  selector: 'app-token-holder-balance-table',
  templateUrl: './token-holder-balance-table.component.html',
  styleUrls: ['./token-holder-balance-table.component.css']
})
export class TokenHolderBalanceTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<AccountBalance>;
  dataSource: TokenHolderBalanceTableDataSource;
  tokenId: string = '';
  displayedColumns = ['accountAddress', 'balance'];

  DEFAULT_PAGE_SIZE = 20;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
    this.dataSource = new TokenHolderBalanceTableDataSource(this.accountService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.tokenId = params['id'];
      }
    );
    this.loadTokenTopHolders(true);
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadTokenTopHolders())
      )
      .subscribe();
  }

  loadTokenTopHolders(onInit: boolean = false): void {
    if (this.tokenId == '') {
      return;
    }
    if (onInit) {
      this.dataSource.loadBalances(this.tokenId, 0, this.DEFAULT_PAGE_SIZE);
      return;
    }
    this.dataSource.loadBalances(this.tokenId, this.paginator.pageIndex, this.paginator.pageSize);
  }

  gotoAddressDetail(address: string) {
    this.router.navigate(['address', address]);
  }
}
