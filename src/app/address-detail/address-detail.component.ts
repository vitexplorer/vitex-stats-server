import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getVitexAccountBalance, VitexAccountBalancePerToken, VitexAccountDetail } from '../account';
import { AccountService } from '../account.service';
import { SBPVoting } from '../sbp';
import { SbpService } from '../sbp.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  address: string = '';
  account: VitexAccountDetail | null = null;
  accountBalances: VitexAccountBalancePerToken[] = [];
  balanceLoaded: boolean = false;
  sbpVoted: SBPVoting | null = null;
  accountBalanceDisplayColumns = ['tokenSymbol', 'tokenId', 'decimals', 'balance',];
  // omitted columns: 'dexAvailableBalance', 'dexLockedBalance', 'totalBalance'

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private sbpService: SbpService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.address = params.address;
      this.loadAccount();
    });
  }

  loadAccount(): void {
    this.accountService.getAccountDetail(this.address).subscribe(
      account => this.account = account
    );
    this.sbpService.getVotedSBP(this.address).subscribe(
      sbp => this.sbpVoted = sbp
    );

  }


  loadBalance(): void {

    if (this.balanceLoaded) {
      return;
    }
    this.accountService.getAccountBalance(this.address).subscribe(
      resp => this.accountBalances = resp.result.balances
    );
    this.balanceLoaded = true;
  }

  gotoTransactionDetail(tokenId: string) {
    this.router.navigate(['token', tokenId]);
  }

  getTotalBalance(account: VitexAccountDetail): number {
    return getVitexAccountBalance(account);
  }

}
