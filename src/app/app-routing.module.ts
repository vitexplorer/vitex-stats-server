import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressComponent } from './address/address.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SbpComponent } from './sbp/sbp.component';
import { TokenDetailComponent } from './token-detail/token-detail.component';
import { TokenComponent } from './token/token.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sbp', component: SbpComponent },
  { path: 'transactions', component: TransactionComponent },
  { path: 'transaction/:hash', component: TransactionDetailComponent },
  { path: 'tokens', component: TokenComponent },
  { path: 'token/:id', component: TokenDetailComponent },
  { path: 'addresses', component: AddressComponent },
  { path: 'address/:address', component: AddressDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
