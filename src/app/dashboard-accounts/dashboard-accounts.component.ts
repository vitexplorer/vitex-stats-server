import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getVitexAccountBalance, VitexAccountDetail } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-dashboard-accounts',
  templateUrl: './dashboard-accounts.component.html',
  styleUrls: ['./dashboard-accounts.component.css']
})
export class DashboardAccountsComponent implements OnInit {

  accounts: VitexAccountDetail[] = [];
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getActiveAccounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  getBalance(account: VitexAccountDetail): number {
    return getVitexAccountBalance(account);
  }
  gotoAddressDetail(address: string) {
    this.router.navigate(['address', address]);
  }
}
