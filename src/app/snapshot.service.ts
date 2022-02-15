import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageSnapshot } from './snapshot';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {

  constructor(private http: HttpClient) { }

  getAccountSnapshots(address: string,
    order: string = 'asc',
    sort_field: string = '',
    pageIdx: number = 0,
    pageSize: number = 20): Observable<PageSnapshot> {
    const reqUrl: string = environment.backendURL + '/ledger/get_snapshot_blocks_by_address/' + address + '/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageSnapshot>(reqUrl);
  }

  getSnapshots(
    order: string = 'desc',
    sort_field: string = 'height',
    pageIdx: number = 0,
    pageSize: number = 5): Observable<PageSnapshot> {
    const reqUrl: string = environment.backendURL + '/ledger/get_snapshot_blocks/' + order + '/' + sort_field + '/' + pageIdx + '/' + pageSize;
    return this.http.get<PageSnapshot>(reqUrl);
  }
  getLatestSnapshots(pageSize: number = 5): Observable<PageSnapshot> {
    const reqUrl: string = environment.backendURL + '/ledger/get_latest_snapshot_blocks/' + pageSize;
    return this.http.get<PageSnapshot>(reqUrl);
  }
}
