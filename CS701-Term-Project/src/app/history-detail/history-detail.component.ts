import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TransactionsService } from '../services/transactions.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit {
  @Input()
  item?: Transaction;
  transactions: Transaction [] = [];

  constructor(
    private transactionsService: TransactionsService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }
  
  //Updates page dynamically with new additions
  ngAfterContentChecked(){
    this.getTransactions();
  }

  //Pulls in current version of transactions Array
  getTransactions(): void {
    this.transactionsService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  //Class determines row highlight (Purchase vs. Sale)
  setClass(transaction: Transaction): string {
    this.getTransactions()
    return transaction.type;
  } 
}
