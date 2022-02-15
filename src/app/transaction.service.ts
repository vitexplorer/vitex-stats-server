import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageTransaction, PageTransactionDetail, CompleteTransaction } from './transaction';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


  getTransactions(pageIdx: number, pageSize: number, order: string = 'desc', sort_field: string = 'timestamp'): Observable<PageTransaction> {
    const reqUrl: string = environment.backendURL + '/ledger/get_account_blocks/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageTransaction>(reqUrl);
  }

  getTokenTransactions(tokenId: string, pageIdx: number, pageSize: number, order: string = 'desc', sort_field: string = 'timestamp'): Observable<PageTransaction> {
    const reqUrl: string = environment.backendURL + '/ledger/get_account_block_by_token/' + tokenId + '/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageTransaction>(reqUrl);
  }

  getAccountTransactions(address: string, pageIdx: number, pageSize: number, order: string = 'desc', sort_field: string = 'timestamp'): Observable<PageTransaction> {
    const reqUrl: string = environment.backendURL + '/ledger/get_account_blocks_by_account/' + address + '/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageTransaction>(reqUrl);
  }

  getAccountUnreceivedTransactions(address: string, pageIdx: number, pageSize: number, order: string = 'desc', sort_field: string = 'timestamp'): Observable<PageTransaction> {
    const reqUrl: string = environment.backendURL + '/ledger/get_unreceived_account_blocks_by_account/' + address + '/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageTransaction>(reqUrl);
  }

  getTransactionDetail(hash: string): Observable<PageTransactionDetail> {
    const reqUrl: string = environment.backendURL + '/ledger/get_complete_account_block_by_hash/' + hash;
    return this.http.get<PageTransactionDetail>(reqUrl);
  }

  getEmptyTransaction(): CompleteTransaction {
    return {
      "id": 0,
      "blockType": 0,
      "height": 0,
      "hash": "",
      "prevHash": "",
      "previousHash": "",
      "accountAddress": "",
      "address": "",
      "publicKey": "",
      "producer": "",
      "fromAddress": "",
      "toAddress": "",
      "fromBlockHash": "",
      "sendBlockHash": "",
      "receiveBlockHeight": 0,
      "receiveBlockHash": "",
      "receiveBlockHeights": "",
      "triggeredSendBlockList": [],
      "tokenId": "",
      "token": {
        'tokenId': '',
        'tokenName': '',
        'tokenSymbol': '',
        'decimals': 18,
        'totalSupply': 0,
        'owner': '',
      },
      "amount": 0,
      "fee": 0,
      "data": "",
      "functionName": "",
      "inputs": "",
      "args": "",
      "signature": "",
      "quota": 0,
      "quotaByStake": 0,
      "quotaUsed": 0,
      "totalQuota": 0,
      "utUsed": 0,
      "logHash": "",
      "nonce": "",
      "tokenName": "",
      "tokenSymbol": "",
      "totalSupply": 0,
      "decimals": 0,
      "owner": "",
      "tokenIndex": 0,
      "isReissuable": "0",
      "ownBurnOnly": "0",
      "isOwnBurnOnly": "0",
      "confirmedTimes": 0,
      "confirmations": 0,
      "confirmedHash": "",
      "firstSnapshotHash": "",
      "snapshotHash": "",
      "timestamp": 0,
      "status": "closed",
      "note": "note content",
      "diffTime": 5880
    };
  }
}
