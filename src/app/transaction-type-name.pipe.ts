import { Pipe, PipeTransform } from '@angular/core';

// type from https://github.com/vitelabs/go-vite/blob/master/interfaces/core/account_block.go#L20
const transactionTypeName = [
  'Unknown',
  'Send Create',
  'Send Call',
  'Send Reward',
  'Receive',
  'Receive Error',
  'Send Refund',
  'Genesis Receive',
];

@Pipe({
  name: 'transactionTypeName'
})
export class TransactionTypeNamePipe implements PipeTransform {
  transform(value: number): string {
    if (value > transactionTypeName.length || value < 0) {
      return 'Unknown';
    }

    return transactionTypeName[value];
  }

}
