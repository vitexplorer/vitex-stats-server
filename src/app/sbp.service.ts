import { Injectable } from '@angular/core';
import { Observable, of, pipe, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SBP, SBPVoting, SBPVotingResponse } from './sbp';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SbpService {

  constructor(private http: HttpClient) { }

  getSBP(): Observable<SBP[]> {
    const reqUrl: string = environment.backendURL + '/contract/get_sbp_list';
    return this.http.get<SBP[]>(reqUrl);
  }

  getActiveSBP(count: number = 3): Observable<SBP[]> {
    const reqUrl: string = environment.backendURL + '/contract/get_active_sbp/' + count;
    return this.http.get<SBP[]>(reqUrl);
  }

  getVotedSBP(address: string): Observable<SBPVoting> {
    const reqUrl: string = environment.backendURL + '/contract/get_voted_sbp/' + address;
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
