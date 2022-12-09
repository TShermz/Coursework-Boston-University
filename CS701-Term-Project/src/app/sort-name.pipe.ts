import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
  pure: false
})
export class SortNamePipe implements PipeTransform {
  transform(array: any, property: string, sort?: string): any[] {
    if(sort ==='ascend'){
      array.sort((a: any, b: any) => {
        if (a[property] < b[property]) {
          return -1;
        } else if (a[property] > b[property]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sort === 'descend'){
        array.sort((a: any, b: any) => {
        if (a[property] < b[property]) {
          return 1;
        } else if (a[property] > b[property]) {
          return -1;
        } else {
          return 0;
        }
      });
    }else {
      if(sort ==='ascend'){
        array.sort((a: any, b: any) => {
          if (a[property] < b[property]) {
            return -1;
          } else if (a[property] > b[property]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
    
    return array;
  }
}
