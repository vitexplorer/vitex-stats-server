import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseAccountBalance, ResponseAccountDetail, ResponseTokenAccountBalance, VitexAccountDetail, VitexAccountPage, VitexAccountVoter } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccountsByPage(order: string, sortField: string, pageIndex: number, pageSize: number): Observable<VitexAccountPage> {
    if (order === '') {
      order = 'asc';
    }
    if (sortField === '') {
      sortField = 'address';
    }
    let startIdx = pageSize * pageIndex;
    const reqUrl: string = environment.backendURL + '/ledger/get_accounts/' + order + '/' + sortField + '/' + startIdx + '/' + pageSize;
    return this.http.get<VitexAccountPage>(reqUrl);
  }

  searchAccountsByAddress(address: string, order: string, sortField: string, pageIndex: number, pageSize: number): Observable<VitexAccountPage> {
    if (order === '') {
      order = 'asc';
    }
    if (sortField === '') {
      sortField = 'address';
    }
    let startIdx = pageSize * pageIndex;
    const reqUrl: string = environment.backendURL + '/ledger/search_accounts/' + address + '/' + order + '/' + sortField + '/' + startIdx + '/' + pageSize;
    return this.http.get<VitexAccountPage>(reqUrl);
  }

  getActiveAccounts(): Observable<VitexAccountDetail[]> {
    return this.getAccountsByPage('desc', 'lastTransactionDate', 0, 5).pipe(
      catchError(() => of({ accounts: [], count: 0 })),
      map(
        res => {
          let result: VitexAccountPage = res as VitexAccountPage;
          return result.accounts;
        }));
  }

  getAccountDetail(address: string): Observable<VitexAccountDetail> {
    const reqUrl: string = environment.backendURL + '/ledger/get_account/' + address;
    return this.http.get(reqUrl).pipe(
      map(res => {
        let result: ResponseAccountDetail = res as ResponseAccountDetail;
        if (result.err != 'ok') {
          return this.getEmptyAccountDetail();
        }
        return result.result;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getEmptyAccountDetail(): VitexAccountDetail {

    return {
      "address": "",
      "balances": [],
      "blockCount": 0,
      "currentQuota": 0,
      "lastModified": new Date(),
      "maxQuota": 0,
      "stakeAmount": 0,
      "viteBalance": 0
    }
  }

  getAccountBalance(address: string): Observable<ResponseAccountBalance> {
    const reqUrl: string = environment.backendURL + '/ledger/get_account/' + address;
    return this.http.get<ResponseAccountBalance>(reqUrl);
  }

  getTopTokenHoldersBalances(tokenId: string,
    pageIndex: number = 0,
    pageSize: number = 20): Observable<ResponseTokenAccountBalance> {
    const reqUrl: string = environment.backendURL + '/ledger/get_token_balanced_desc/' + tokenId + '/' + pageIndex + '/' + pageSize;
    return this.http.get<ResponseTokenAccountBalance>(reqUrl);
  }
}
