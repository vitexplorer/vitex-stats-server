import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AddressTableDataSource } from './address-table-datasource';
import { AccountService } from '../account.service';
import { getVitexAccountBalance, VitexAccount, VitexAccountDetail } from '../account';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { SBP } from '../sbp';
import { SbpService } from '../sbp.service';
import { TokenService, VITE_TOKEN_ID } from '../token-service.service';
import { TokenTableItem } from '../token';


@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VitexAccount>;
  @Input()
  get searchKey(): string { return this._searchKey; }
  set searchKey(newKey: string) {
    this._searchKey = newKey;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.loadAccountsPage();
      console.log('searchKey: ' + this.searchKey);
    }
  }
  private _searchKey: string = '';
  dataSource: AddressTableDataSource;
  viteToken: TokenTableItem = {
    "decimals": 18,
    "index": 0,
    "isOwnerBurnOnly": false,
    "isReIssuable": true,
    "maxSupply": 115792089237316195423570985008687907853269984665640564039457584007913129639935,
    "owner": "vite_0000000000000000000000000000000000000004d28108e76b",
    "tokenId": "tti_5649544520544f4b454e6e40",
    "tokenName": "VITE",
    "tokenSymbol": "VITE",
    "totalSupply": 1028379410336224229303315974
  };


  sbpCache = new Map<string, SBP>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['address', 'name', 'viteBalance', 'currentQuota', 'stakingAmount', 'totalBalance', 'percentage', 'txnCount'];

  constructor(private accountService: AccountService,
    private sbpService: SbpService,
    private tokenService: TokenService,
    private router: Router) {
    this.dataSource = new AddressTableDataSource(this.accountService);
  }

  ngOnInit(): void {
    this.dataSource.loadAccounts();
    this.sbpService.getSBP().subscribe(sbps => {
      for (let sbp of sbps) {
        this.sbpCache.set(sbp.stakeAddress, sbp);
      }
    });
    this.tokenService.getTokenByName(VITE_TOKEN_ID).subscribe(token => {
      this.viteToken = token;
    });
  }

  ngAfterViewInit(): void {

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAccountsPage())
      )
      .subscribe();
  }

  loadAccountsPage() {
    this.dataSource.loadAccounts(
      this._searchKey,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  gotoAddressDetail(address: string) {
    this.router.navigate(['address', address]);
  }

  getVitexBalance(account: VitexAccountDetail): number {
    return getVitexAccountBalance(account);
  }

  getSBPName(address: string): string {
    const sbp = this.sbpCache.get(address);
    if (sbp) {
      return sbp.name;
    }
    return '';
  }

  getSBPStakeAmount(address: string): number | null {
    const sbp = this.sbpCache.get(address);
    if (sbp) {
      return Math.floor(sbp.stakeAmount / Math.pow(10, 18));
    }
    return null;
  }

  getVitePercentage(account: VitexAccountDetail): number {
    return account.viteBalance / this.viteToken.totalSupply;
  }

}
