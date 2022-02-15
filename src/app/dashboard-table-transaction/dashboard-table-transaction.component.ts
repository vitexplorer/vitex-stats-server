import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-dashboard-table-transaction',
  templateUrl: './dashboard-table-transaction.component.html',
  styleUrls: ['./dashboard-table-transaction.component.css']
})
export class DashboardTableTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  refreshProgress: number = 100;
  private updateSub: Subscription | null = null;

  constructor(private transactionService: TransactionService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.refresh();
    this.updateSub = interval(1000).subscribe((val) => {
      this.refresh();
    });
  }

  gotoTransactionDetail(hash: string) {
    this.router.navigate(['transaction', hash]);
  }

  refresh(): void {
    if (this.refreshProgress < 100) {
      this.refreshProgress = this.refreshProgress + 20;
      return
    }
    this.refreshProgress = 0;
    this.transactionService.getTransactions(0, 3).subscribe(
      transactionPage => this.transactions = transactionPage.accountBlocks
    );
  }

}
