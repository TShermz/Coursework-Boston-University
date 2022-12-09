import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNames',
  pure: false
})
export class FilterNamesPipe implements PipeTransform {

  transform(transactions: any, property: string): any[] {
    if (transactions){
      return transactions.filter((listing: any) => listing.name === property);
    }
  }
}
