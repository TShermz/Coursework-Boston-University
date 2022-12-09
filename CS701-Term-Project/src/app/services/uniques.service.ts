import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TransactionsService } from './transactions.service';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UniquesService {
  //Stores all transactions
  transactions: Transaction [] = [];

  //Array of HistoryItem for unique items
  uniqueHistoryItems: string [] = [];
  uniqueItem: string;

  constructor(private transactionsService: TransactionsService) { }

  getTransactions(): void {
    this.transactionsService.getTransactions()
      .subscribe( transactions => this.transactions = transactions);
  }

  //Exports array of string to Stats Service
  getUniques():  Observable<string[]>{
    const uniqueItems = of(this.uniqueHistoryItems);
    return uniqueItems;
  }

  //Takes transactions upon initialization to create unique list of transacton names; sends to Stats Service
  setUniques(): void {
    this.getTransactions();
    let transactionNames = this.transactions.map(({name}) => {return name});
    let uniqueHistoryNames = [...new Set(transactionNames)];

    for (let name in uniqueHistoryNames){
      if (!this.uniqueHistoryItems[name]){
        let uniqueItem = uniqueHistoryNames[name]
        this.uniqueHistoryItems.push(uniqueItem);
      }
    }
  }
}



