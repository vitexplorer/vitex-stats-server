import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TokenInfoList, TokenTableItem } from './token';
import { environment } from '../environments/environment';

export const VITE_TOKEN_ID = 'tti_5649544520544f4b454e6e40';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  getTokenTableItems(sortOrder: string = 'asc',
    sortColumn: string = '',
    pageIdx: number = 0,
    pageSize: number = 10,
    searchKeyword: string = ''): Observable<TokenInfoList> {
    if (searchKeyword.length > 0) {
      // use search API
      const reqUrl: string = environment.backendURL() + '/contract/search_token_name/' + searchKeyword
        + '/' + sortOrder + '/' + sortColumn + '/' + pageIdx + '/' + pageSize;
      return this.http.get<TokenInfoList>(reqUrl);
    }


    const reqUrl: string = environment.backendURL() + '/contract/get_token_info_list/'
      + '/' + sortOrder + '/' + sortColumn + '/' + pageIdx + '/' + pageSize;
    return this.http.get<TokenInfoList>(reqUrl);
  }

  getTokenByName(id: string): Observable<TokenTableItem> {
    const reqUrl: string = environment.backendURL() + '/contract/get_token_info/' + id;
    return this.http.get<TokenTableItem>(reqUrl);
  }
}
