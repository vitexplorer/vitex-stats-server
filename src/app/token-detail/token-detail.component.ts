import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { TokenTableItem } from '../token';
import { TokenService } from '../token-service.service';
import { TokenTableComponent } from '../token-table/token-table.component';

@Component({
  selector: 'app-token-detail',
  templateUrl: './token-detail.component.html',
  styleUrls: ['./token-detail.component.css']
})
export class TokenDetailComponent implements OnInit {
  tokenId: string = '';
  token: TokenTableItem | null = null;

  constructor(private tokenService: TokenService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.tokenId = params['id'];
        this.tokenService.getTokenByName(this.tokenId).subscribe(
          token => this.token = token
        );
      }
    )
  }
}
