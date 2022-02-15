import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { TokenTableComponent } from '../token-table/token-table.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  searchKeyword = '';
  @ViewChild(TokenTableComponent) tokenTable!: TokenTableComponent;

  constructor(private changeDetector: ChangeDetectorRef) { }

  clearSearch() {
    this.searchKeyword = '';
    this.changeDetector.detectChanges();
    this.tokenTable && this.tokenTable.loadTokens();
  }
}
