import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Transaction } from 'src/app/datatypes/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpService) { }
  allTransactions() {
    return this.http.get<Transaction[]>("allTransaction")
  }
  createTransaction(data: Transaction) {
    return this.http.post<Transaction>("transaction", data)
  }
}
