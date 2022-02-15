import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenHolderBalanceTableComponent } from './token-holder-balance-table.component';

describe('TokenHolderBalanceTableComponent', () => {
  let component: TokenHolderBalanceTableComponent;
  let fixture: ComponentFixture<TokenHolderBalanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenHolderBalanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenHolderBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
