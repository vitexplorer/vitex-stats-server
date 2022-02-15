import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  @Input()
  address: string = "";
  contract: Contract | null = null;

  constructor(private contractService: ContractService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.address = params.address;
      this.loadContract();
    });


  }

  loadContract(): void {
    this.contractService.getContract(this.address).subscribe(
      contractResp => {
        if (contractResp.err === 'not found' || contractResp.contract == null) {
          this.contract = null;
        } else if (contractResp.err === 'ok') {
          this.contract = contractResp.contract;
        } else {
          this.contract = null;
        }
      }
    );
  }

  decodeSourceCode(encoded: string): string {
    let decoded: string = '';
    for (let i = 0; (i < encoded.length && encoded.substr(i, 2) !== '00'); i += 2) {
      decoded += String.fromCharCode(parseInt(encoded.substr(i, 2), 16));
    }
    return decoded;
  }

  decodeContractCodeBase64ToUtf8(encoded: string | null): string {
    if (encoded == null) {
      return '';
    }
    return atob(encoded);
  }

  decodeContractCodeBase64ToHex(encoded: string | null): string {
    if (encoded == null) {
      return '';
    }

    const raw = atob(encoded);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
  }

}
