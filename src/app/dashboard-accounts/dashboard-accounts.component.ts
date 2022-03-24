import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { getVitexAccountBalance, VitexAccountDetail } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-dashboard-accounts',
  templateUrl: './dashboard-accounts.component.html',
  styleUrls: ['./dashboard-accounts.component.css']
})
export class DashboardAccountsComponent implements OnInit {

  accounts: VitexAccountDetail[] = [];
  refreshProgress: number = 100;
  private updateSub: Subscription | null = null;
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.updateSub = interval(1700).subscribe((val) => {
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }


  refresh(): void {
    if (this.refreshProgress < 100) {
      this.refreshProgress = this.refreshProgress + 20;
      return
    }
    this.refreshProgress = 0;
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
  gotoAddressList() {
    this.router.navigate(['addresses']);
  }
}
