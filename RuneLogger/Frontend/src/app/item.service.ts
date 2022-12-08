import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './interfaces/item.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private Url = 'http://localhost:8080/api/';  // URL to web api

  constructor(
    private http: HttpClient
  ) {}

  getItems (): Observable<Item[]> {
    return this.http.get<Item[]>(this.Url);
  }

  // updateItem(id: number): Observable<Item> {
  //   const url = `${this.Url}/transaction/${id}`;
  //   this.item = this.http.get<Item>(url);
  //   return this.item;
  // }
}
