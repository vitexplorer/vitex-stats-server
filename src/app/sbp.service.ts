import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SBP, SBPVoting, SBPVotingResponse } from './sbp';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SbpService {

  private sbpCache: Map<string, SBP>;

  constructor(private http: HttpClient) {
    this.sbpCache = new Map<string, SBP>();
  }

  getSBPList(): Observable<SBP[]> {
    if (this.sbpCache.size > 0) {
      return of(Array.from(this.sbpCache.values()));
    }
    const reqUrl: string = environment.backendURL() + '/contract/get_sbp_list';
    return this.http.get<SBP[]>(reqUrl).pipe(
      tap(sbps => {
        for (let sbp of sbps) {
          this.sbpCache.set(sbp.stakeAddress, sbp);
        }
      }),
    );
  }
  getSBPMap(): Observable<Map<string, SBP>> {
    if (this.sbpCache.size > 0) {
      return of(this.sbpCache);
    }
    const reqUrl: string = environment.backendURL() + '/contract/get_sbp_list';
    return this.http.get<SBP[]>(reqUrl).pipe(
      map(sbps => {
        for (let sbp of sbps) {
          this.sbpCache.set(sbp.stakeAddress, sbp);
        }
        return this.sbpCache;
      }),
    );
  }

  getActiveSBP(count: number = 3): Observable<SBP[]> {
    const reqUrl: string = environment.backendURL() + '/contract/get_active_sbp/' + count;
    return this.http.get<SBP[]>(reqUrl);
  }

  getVotedSBP(address: string): Observable<SBPVoting> {
    const reqUrl: string = environment.backendURL() + '/contract/get_voted_sbp/' + address;
    return this.http.get(reqUrl).pipe(
      map(response => {
        let resp = response as SBPVotingResponse;
        if (resp.err == 'ok') {
          return resp.sbp;
        }
        return {
          blockProducerName: '',
          status: 0,
          votes: 0
        };
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }
}
