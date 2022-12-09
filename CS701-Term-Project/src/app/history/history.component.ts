import { Component, OnInit } from '@angular/core';
import { ItemStat } from '../interfaces/itemStat';
import { Transaction } from '../interfaces/transaction';
import { TransactionsService } from '../services/transactions.service';
import { UniquesService } from '../services/uniques.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  transactions: Transaction [] = [];
  uniqueHistoryItems: string [] = [];
  statistics: ItemStat [] = [];
  property: string = 'name';
  selectedItem?: Transaction;

  sort: string = 'ascend';
  storedID: string = '';

  constructor(
    private transactionsService: TransactionsService,
    private uniquesService: UniquesService,
    private statsService: StatsService
    ) { }

  ngOnInit() {
    this.getTransactions();
    this.uniquesService.setUniques();
    this.getUniques();
    this.getStats();
  }

  //IMPORT DATA METHODS FROM OTHER SERVICES//

  getTransactions(): void {
    this.transactionsService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  getUniques():void {
    this.uniquesService.getUniques()
      .subscribe(uniqueItems => this.uniqueHistoryItems = uniqueItems);
  }

  getStats(): void {
    this.statsService.getStats()
    .subscribe(statistics => this.statistics = statistics);
  }

  
  //Sends selected item to history-details to display all transactions
  onSelect(item: Transaction): void{
    this.getStats();
    this.selectedItem = item;
  }

  //When table header is clicked, it will sort ascending/descending
  changeSort(property: string){ 
    this.property = property;

    if(this.sort==='ascend'){
      this.sort='descend';
      this.storedID = property;
    }else {
      this.sort = 'ascend';
      this.storedID = property;
    }
  }

  //Sets class to Table column that is sorted ascending/descending
  setClass(property: string){
    if (property === this.storedID){
      return this.sort;
    } else {
      return '';
    }
  }

  //Testing method to clear localStorage and reset page
  clearStorage(){
    window.localStorage.clear();
  }

}
