import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accountService/account.service';
import { ChartService } from 'src/app/services/chart.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any;
  totalIncome: number = 0;
  totalExpense: number = 0;
  constructor(
    private accountService: AccountService,
    private chartService: ChartService
  ) { }
  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.accountService.getAccounts().subscribe((response: any) => {
      this.accounts = response.body;
      this.totalIncome = this.calculateTotal('income');
      this.totalExpense = this.calculateTotal('expense');
      console.log(response.body)
      this.accounts.forEach((account: { balance: number; transactions: any[]; }) => {
        account.balance = this.calculateBalance(account.transactions);

      });
      this.generateChart();
    });
  }

  calculateTotal(type: string): number {
    return this.accounts.reduce((total: any, account: { transactions: any[]; }) => {
      return total + account.transactions.filter(transaction => transaction.type === type)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    }, 0);
  }
  

  calculateBalance(transactions: any[]): number {
    return transactions.reduce((balance, transaction) => {
      return balance + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
  }
  generateChart(): void {
    const labelData = this.accounts.map((account: any) => account.accountType);
    const balanceData = this.accounts.map((account: any) => account.balance);
    const colors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ]; 
    this.chartService.RenderChart(labelData, balanceData, colors, 'doughnut', 'accountChart');

    const label2 = ['Income', 'Expense'];
    const data2 = [this.totalIncome, this.totalExpense];
    const color = ['#01F80A', '#E51717'];
    // Render the income vs. expense chart
    this.chartService.RenderChart(label2, data2, color, 'pie', 'incomeExpenseChart');
  }
}
