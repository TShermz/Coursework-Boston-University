import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TransactionsService } from '../services/transactions.service';
import { UniquesService } from '../services/uniques.service';
import { StatsService } from '../services/stats.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionsComponent implements OnInit {
  transaction: Transaction = {
    type: "",
    date: "",
    name: "",
    price: 0,
    quantity: 0,
    total: 0
  };

  transactions: Transaction [] = [];

  constructor(
    private transactionsService: TransactionsService, 
    private uniquesService: UniquesService,
    private statsService: StatsService
  ) { }

  ngOnInit() {}
  
  //If transactions exist in LocalStorage, they are pulled
  //If not, transactions are pulled from local file and stored in LocalStorage
  getTransactions(): void {
    this.transactionsService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  submitTransaction(form: NgForm){
    //Calculate Total Spent/Earned from transaction
    this.transaction.total = this.transaction.price*this.transaction.quantity;

    //get transactions
    this.getTransactions();

    // this.transactionsService.storeTransactions(this.transactions);
    this.transactionsService.createNewTransaction(this.transaction);

    //establish unique items with new addition
    this.uniquesService.setUniques();

    //update statistics
    this.statsService.submitTransaction(this.transaction);
    console.log(localStorage.getItem('transactions'))

    //reset the form
    form.resetForm();
    return false;
  }

}
