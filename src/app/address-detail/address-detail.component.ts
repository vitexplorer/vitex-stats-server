import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getVitexAccountBalance, VitexAccountBalancePerToken, VitexAccountDetail } from '../account';
import { AccountService } from '../account.service';
import { ContractService } from '../contract.service';
import { SBP, SBPVoting } from '../sbp';
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
  addressType: string = '';
  sbpInfo: SBP | undefined = undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private sbpService: SbpService,
    private contractService: ContractService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.address = params.address;
      this.loadAccount();
      this.loadSBPInfo();
    });
  }

  loadAccount(): void {
    this.accountService.getAccountDetail(this.address).subscribe(
      account => this.account = account
    );
    this.sbpService.getVotedSBP(this.address).subscribe(
      sbp => this.sbpVoted = sbp
    );
    this.contractService.getContract(this.address).subscribe(
      contractResp => {
        if (contractResp.err === 'ok') {
          this.addressType = 'contract';
        } else if (this.sbpInfo !== undefined) {
          this.addressType = 'sbp';
        } else {
          this.addressType = 'account';
        }
      }
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

  loadSBPInfo(): void {
    this.sbpService.getSBPMap().subscribe(
      sbpMap => {
        this.sbpInfo = sbpMap.get(this.address);
        if (this.sbpInfo) {
          this.addressType = 'sbp';
        }
      }
    );
  }

  gotoTransactionDetail(tokenId: string) {
    this.router.navigate(['token', tokenId]);
  }

  getTotalBalance(account: VitexAccountDetail): number {
    return getVitexAccountBalance(account);
  }

}
