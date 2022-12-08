import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private id!: number;

  constructor(private router: Router, private transactionService: TransactionService) {}

  ngOnInit() {};

  // isHomeRoute(){
  //   return this.router.url === '/';
  // };

  // isTransactionsRoute(){
  //   this.id = this.transactionService.getId();
  //   console.log(`/transactions/${this.id}`);
  //   return this.router.url === `/transactions/${this.id}`; //does not respond to :id
  // }
  
}
