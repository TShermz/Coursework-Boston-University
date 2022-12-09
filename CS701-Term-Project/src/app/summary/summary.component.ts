import { Component, OnInit } from '@angular/core';
import { ItemStat } from '../interfaces/itemStat';
import { TotalStat } from '../interfaces/totals';
import { StatsService } from '../services/stats.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  statistics: ItemStat [] = [];
  totalStats: TotalStat = {
    totalProfit: 0,
    totalTransactions: 0
  }

  constructor(
    private statsService: StatsService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  //Dynamically updates total statistics as new submissions are entered
  ngAfterContentChecked() {
    this.getTotals();
  }

  getStats(): void {
    this.statsService.getStats()
    .subscribe(statistics => this.statistics = statistics);
  }
 
  getTotals(): void {
    this.statsService.getTotals()
        .subscribe(totals => this.totalStats = totals);
  }

}
