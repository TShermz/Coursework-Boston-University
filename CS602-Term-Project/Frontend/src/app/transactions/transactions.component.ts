import { Component, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions?: Transaction[];
  transaction = new Transaction();
  id?: number;
  name: string | null | undefined;
  edit = true;
  message?: string;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.getTransactions(this.name);
  };

  getTransactions(name: any){
    return this.transactionService.getTransactions(name)
               .subscribe(
                 transactions => {
                  this.transactions = transactions
                 }
                );
 }

 editTransaction(): void {
  this.edit = false;
  }

  saveTransaction(transaction: Transaction) {
  this.edit = true;
   this.save(transaction);
  }

  deleteTransaction(id: number): void {
    this.edit = false;
    this.transactionService.deleteTransaction(id)
    .subscribe(result => this.message = "Customer Deleted Successfully!");
  }

  private save(transaction: Transaction): void {
    this.transactionService.updateTransaction(transaction)
        .subscribe();
  }
}
