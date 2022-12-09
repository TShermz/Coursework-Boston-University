import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TotalStat } from '../interfaces/totals';
import { ItemStat } from '../interfaces/itemStat';
import { Transaction } from '../interfaces/transaction';
import { TransactionsService } from './transactions.service';
import { UniquesService } from './uniques.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  statistics: ItemStat[] = [];
  transactions: Transaction [] = [];
  uniques: string [] = [];
  totalStats: TotalStat = {
    totalProfit: 0,
    totalTransactions: 0
  }

  constructor(
    private transactionsService: TransactionsService,
    private uniquesService: UniquesService
  ) {}

  //IMPORT DATA METHODS FROM OTHER SERVICES//

  getTransactions(): void {
    this.transactionsService.getTransactions()
      .subscribe( transactions => this.transactions = transactions);
  }
  
  getUniques(): void {
    this.uniquesService.getUniques()
      .subscribe(uniqueItems => this.uniques = uniqueItems);
  }

  //LOCAL STORAGE METHODS//

  storeStats(storageStatistics: any): void {
    const storageSTRING = JSON.stringify(storageStatistics)
    localStorage.setItem('statistics', storageSTRING)
  }

  storeTotals(storageTotals: any): void {
    const storageSTRING = JSON.stringify(storageTotals)
    localStorage.setItem('totals', storageSTRING)
  }
  
  //EXPORT DATA METHODS TO COMPONENTS//

  getStats(): Observable<ItemStat[]>{
    this.getTransactions();
    this.getUniques();
    let testForStatistics = localStorage.getItem('statistics');
    if(testForStatistics){
      this.statistics = JSON.parse(testForStatistics);
    } else{    
      this.initStats();
      this.getTotals();
      this.storeStats(this.statistics);
    }
    return of(this.statistics);
  }

  getTotals(): Observable<TotalStat>{
    let testForTotals = localStorage.getItem('totals');
    this.totalStats = JSON.parse(testForTotals);
    return of(this.totalStats);
  }

  //DATA MANAGEMENT METHODS//

  //Called when localStorage is empty; pulls data from local source and creates Statistics array of unique transaction names
  initStats(): void{
    this.getUniques();
    for(let x in this.uniques){
      this.createNewStat(this.uniques[x])
    }

    for( let x in this.statistics){
      for (let y in this.transactions){
        let profit = this.transactions[y].price*this.transactions[y].quantity;
        if(this.statistics[x].name === this.transactions[y].name){
          if(this.transactions[y].type === "purchase"){
            this.statistics[x].profit -= profit;
            this.statistics[x].totalPurchased += this.transactions[y].quantity;
            this.totalStats.totalProfit -= profit;
          }else {
            this.statistics[x].profit += profit;
            this.statistics[x].totalSold += this.transactions[y].quantity;
            this.totalStats.totalProfit += profit;
          }
          this.statistics[x].totalTransactions+= 1;
          this.totalStats.totalTransactions += 1;
        }
      }
    }  
    this.storeTotals(this.totalStats)
  }

  //Called when new submission is received; determines if new transaction's name exists in the Statistics array (unique names) or not
  //Updates accumulatives statistics in totalStats
  //Stores updated data in localStorage
  submitTransaction(transaction: Transaction): void {
    let max = this.statistics.length;
    let counter = 0; 
    for( let x in this.statistics){
      if( this.statistics[x].name === transaction.name){      //if new transaction's name exists, existing properties are updated with new data
        this.updateStats(transaction, counter);
        break;
      }else if(counter+1 === max){                            //if new transaction's name does not exist, new transaction data is added to Statistics array
        this.createNewStat(transaction);
      }else {
        counter++; 
      }
    }
    this.storeTotals(this.totalStats);
    this.storeStats(this.statistics);
  }

  //Used after initialization; only used for new submission that does not have existing data
  createNewStat(transaction: any): void {
    let newStat: ItemStat;
    if(typeof transaction === 'string'){    //Used to initialize unique names in Statistics array from local source
      let newStat: ItemStat = {
        name:  transaction,
        totalPurchased: 0,
        totalSold: 0,
        totalTransactions: 0,
        profit: 0
      }
      this.statistics.push(newStat);
    }else {
      let newStat: ItemStat = {             //Used to create a new entry in Statistics array from a new submission from Submissions component
        name: transaction.name,
        totalPurchased: 0,
        totalSold: Number(transaction.quantity),
        totalTransactions: 1,
        profit: transaction.quantity*transaction.price
      };

      if(transaction.type === "purchase"){      //Adjusts data entry if it is a purchase instead of sale
        newStat.totalPurchased = Number(transaction.quantity),
        newStat.totalSold = 0,
        newStat.profit *= -1;
      }

      this.updateTotals(newStat);
      this.statistics.push(newStat);
    }
  }

  //Used after initialization; only used for new submission that has existing data
  updateStats(transaction: Transaction, x: number){
    let profit = transaction.price*transaction.quantity;

    if(transaction.type === "purchase"){
      this.statistics[x].profit -= profit;
      this.totalStats.totalProfit -= profit;
    }else{
      this.statistics[x].profit += profit;
      this.totalStats.totalProfit += profit;
      this.statistics[x].totalSold += transaction.quantity;
    }

    this.statistics[x].totalTransactions += 1;
    this.totalStats.totalTransactions += 1;
  }

  //Used to update totalStats Object data to display in Summary component
  updateTotals(newStat: ItemStat): void {
    this.totalStats.totalProfit += newStat.profit;
    this.totalStats.totalTransactions += 1;
  } 
}
