import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ItemsComponent } from '../items/items.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TransactiondetailsComponent } from '../transactiondetails/transactiondetails.component';

@NgModule({
  declarations: [
    AddTransactionComponent,
    ItemsComponent,
    TransactionsComponent,
    TransactiondetailsComponent
  ],
  imports: [CommonModule, 
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    AddTransactionComponent,
    ItemsComponent,
    TransactionsComponent
  ]
})

export class SharedModule {}