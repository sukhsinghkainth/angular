import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Account } from 'src/app/datatypes/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpService) { }
  getAccounts() {
    return this.http.get<Account[]>("account")
  }
}
