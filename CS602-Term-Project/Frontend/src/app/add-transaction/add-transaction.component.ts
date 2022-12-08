import { Component, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TransactionService } from '../transaction.service';
import { Location } from '@angular/common';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent {

  transaction = new Transaction();
  submitted = false;

  constructor(
    private transactionService: TransactionService,
    private itemService: ItemService,
    private location: Location
  ) { }

  newTransaction(): void {
    this.submitted = false;
    this.transaction = new Transaction();
  }

 addTransaction() {
   this.submitted = true;
   this.save();
 }

  private save(): void {
    console.log(this.transaction);
    this.transactionService.addTransaction(this.transaction)
        .subscribe();
    // this.itemService.getItems().subscribe();
  }

  public refresh(): void {
    window.location.reload();
  }

}
