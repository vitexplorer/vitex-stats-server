import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractResponse } from './contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getContract(address: string): Observable<ContractResponse> {
    const reqUrl: string = environment.backendURL() + '/contract/get_contract_info/' + address;
    return this.http.get<ContractResponse>(reqUrl);
  }
}
