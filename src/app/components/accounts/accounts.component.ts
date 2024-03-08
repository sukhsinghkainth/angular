import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accountService/account.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any;
  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.getAccount();
  }
  getAccount(): void {
    this.accountService.getAccounts().subscribe((response: any) => {
      this.accounts = response.body;
      this.accounts.forEach((account: { balance: number; transactions: any[]; }) => {
        account.balance = this.calculateBalance(account.transactions);
      });
    });
  }
  calculateBalance(transactions: any[]): number {
    return transactions.reduce((balance, transaction) => {
      return balance + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
  }
}
