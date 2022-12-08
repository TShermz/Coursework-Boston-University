import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';

const routes: Routes = [
  {
    path: 'transactions/:name',
    component: TransactionsComponent
  },
  {
    path: 'transactions/:name/:transId',
    component: TransactiondetailsComponent
  },
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: '**',
    component: ItemsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
