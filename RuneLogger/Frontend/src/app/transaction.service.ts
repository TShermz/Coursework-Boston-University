import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './interfaces/transaction';
import { ItemService } from './item.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsUrl = 'http://localhost:8080/api';  // URL to web api
  private id!: number;
  
  constructor(
    private http: HttpClient,
    private itemService: ItemService
  ) { }

  getTransactions (name: string): Observable<Transaction[]> {
    const url = `${this.transactionsUrl}/transactions/${name}`;
    return this.http.get<Transaction[]>(url)
  }

  getTransaction(name?: any, id?: any): Observable<Transaction> {
    const url = `${this.transactionsUrl}/transactions/${name}/${id}`;
    return this.http.get<Transaction>(url);
  }

  addTransaction (transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, httpOptions);
  }

  deleteTransaction (transaction: Transaction | number): Observable<Transaction> {
    const id = typeof transaction === 'number' ? transaction : transaction.transId;
    const url = `${this.transactionsUrl}/transactions/:name/${id}`;

    return this.http.delete<Transaction>(url, httpOptions);
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    console.log(`${this.transactionsUrl}/transactions`);
    return this.http.put(`${this.transactionsUrl}/transactions`, transaction, httpOptions);
  }
}
