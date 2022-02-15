import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SbpComponent } from './sbp/sbp.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TokenComponent } from './token/token.component';
import { TokenDetailComponent } from './token-detail/token-detail.component';
import { AddressComponent } from './address/address.component';
import { TokenTableComponent } from './token-table/token-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SbpTableComponent } from './sbp-table/sbp-table.component';
import { DashboardTableTransactionComponent } from './dashboard-table-transaction/dashboard-table-transaction.component';
import { DashboardMarketcapComponent } from './dashboard-marketcap/dashboard-marketcap.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimeToNowPipe } from './time-to-now.pipe';
import { DashBoardTransactionTrendComponent } from './dash-board-transaction-trend/dash-board-transaction-trend.component';
import { DashboardActiveNodesComponent } from './dashboard-active-nodes/dashboard-active-nodes.component';
import { DashboardSnapshotComponent } from './dashboard-snapshot/dashboard-snapshot.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { DashboardAccountsComponent } from './dashboard-accounts/dashboard-accounts.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { AddressFormatPipe } from './address-format.pipe';
import { TokenTransactionTableComponent } from './token-transaction-table/token-transaction-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { SnapshotTableComponent } from './snapshot-table/snapshot-table.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPointPipe } from './decimal-point.pipe';
import { TransactionTypeNamePipe } from './transaction-type-name.pipe';
import { DashboardPriceTrendComponent } from './dashboard-price-trend/dashboard-price-trend.component';
import { DashboardSupplyComponent } from './dashboard-supply/dashboard-supply.component';
import { TokenHolderBalanceTableComponent } from './token-holder-balance-table/token-holder-balance-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SbpComponent,
    TransactionComponent,
    TokenComponent,
    TokenDetailComponent,
    AddressComponent,
    TokenTableComponent,
    SbpTableComponent,
    DashboardTableTransactionComponent,
    DashboardMarketcapComponent,
    TimeToNowPipe,
    DashBoardTransactionTrendComponent,
    DashboardActiveNodesComponent,
    DashboardSnapshotComponent,
    AddressTableComponent,
    DashboardAccountsComponent,
    TransactionTableComponent,
    AddressFormatPipe,
    TokenTransactionTableComponent,
    TransactionDetailComponent,
    AddressDetailComponent,
    SnapshotTableComponent,
    ContractDetailComponent,
    DecimalPointPipe,
    TransactionTypeNamePipe,
    DashboardPriceTrendComponent,
    DashboardSupplyComponent,
    TokenHolderBalanceTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
