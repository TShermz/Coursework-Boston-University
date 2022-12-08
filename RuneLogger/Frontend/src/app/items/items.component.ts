import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';
import { Item } from '../interfaces/item.interface';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  items?: Item[];

  constructor(
    private itemService: ItemService,
    private transactionService: TransactionService
    ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getTransactions(name: string){
    this.transactionService.getTransactions(name);
  }

  getItems(){
    return this.itemService.getItems()
               .subscribe(
                 items => {
                  this.items = items
                 }
                );
 }

 prepareParam(str: string){
  return str.trim().replace(/ /g, "_");
 }
}
