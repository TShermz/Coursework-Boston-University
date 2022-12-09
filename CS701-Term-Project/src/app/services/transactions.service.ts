import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TRANSACTIONS } from '../transactions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions: Transaction [] = [];
  

  constructor() { }

  //Stores current iteration of transactions Array into localStorage
  storeTransactions(storageTransactions){
    const storageSTRING = JSON.stringify(storageTransactions)
    localStorage.setItem('transactions', storageSTRING)
  }

  //Retrieves transactions from localStorage or hard-coded "transactions.ts"
  //Exports transactions to various services and components
  getTransactions(): Observable<Transaction[]>{
    let testForTransactions = localStorage.getItem('transactions');
    if(testForTransactions){
      this.transactions = JSON.parse(testForTransactions);
    } else{
      this.transactions = TRANSACTIONS;
      this.storeTransactions(this.transactions);
    }
    return of(this.transactions);
  }

  //Called when a new transaction is entered to update the transactions Array
  createNewTransaction(transaction: Transaction): void {
    this.getTransactions();
    this.transactions.push(transaction);
    this.storeTransactions(this.transactions);
  } 
 
}
