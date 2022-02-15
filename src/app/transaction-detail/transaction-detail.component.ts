import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction, CompleteTransaction, transactionStatus } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  hash: string = '';
  transaction: CompleteTransaction;

  constructor(private route: ActivatedRoute,
    private transactionService: TransactionService) {
    this.transaction = this.transactionService.getEmptyTransaction();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hash = params['hash'];
      this.loadTransactiontDetail();
    });
  }

  loadTransactiontDetail(): void {
    if (this.hash == '') {
      return;
    }
    this.transactionService.getTransactionDetail(this.hash).subscribe(
      transaction => this.transaction = transaction.result
    );

  }

  decodeData(data: string): string {
    return escape(atob(data));
  }

  getTransactionStatus(transaction: Transaction): string {
    return transactionStatus(transaction);
  }

}
