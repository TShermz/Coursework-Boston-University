import { Component, OnInit,  } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../interfaces/transaction';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transactiondetails',
  templateUrl: './transactiondetails.component.html',
  styleUrls: ['./transactiondetails.component.scss'],
})
export class TransactiondetailsComponent implements OnInit {
  transaction = new Transaction();
  name?: any;
  id?: any;
  submitted = false;
  message?: string;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('transId');
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.id);
    console.log(this.name);
    this.getTransaction(this.name, this.id);
  }

  getTransaction(name: string, id: string){
      this.transactionService.getTransaction(name, id)
        .subscribe(transaction => this.transaction = transaction);
  }

  update(): void {
    this.submitted = true;
    this.transactionService.updateTransaction(this.transaction)
      .subscribe(result => this.message = "TransactionUpdated Successfully!");
  }

  delete(): void {
    this.submitted = true;
    this.transactionService.deleteTransaction(this.transaction.transId)
      .subscribe(result => this.message = "Transaction Deleted Successfully!");
  }

  public refresh(): void {
    window.location.reload();
  }
}

