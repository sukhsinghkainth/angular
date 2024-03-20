import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account, Transaction, categoryType } from 'src/app/datatypes/dataTypes';
import { AccountService } from 'src/app/services/accountService/account.service';
import { ChartService } from 'src/app/services/chartService/chart.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  dailyTotals: { date: string, income: number, expense: number }[] = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  selectedMonth: Date = new Date(); // Initialize with the current month

  constructor(
    private accountService: AccountService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.accountService.getAccounts().subscribe((response: HttpResponse<Account[]>) => {
      console.log(response.body)
      this.accounts = response.body || [];
      this.totalIncome = this.calculateTotal(categoryType.income);
      this.totalExpense = this.calculateTotal(categoryType.expense);
      const transactionsByDate = this.processTransactionsByDate(this.accounts);
      const dailyTotals = this.calculateDailyTotals(transactionsByDate, this.selectedMonth);
      this.accounts.forEach((account) => {
        account.balance = this.calculateBalance(account.transactions);
      });
      this.generateChart(dailyTotals);
      this.generateChart2(dailyTotals);
    });
  }

  calculateDailyTotals(transactionsByDate: { [date: string]: Transaction[] }, selectedMonth: Date): { date: string, income: number, expense: number }[] {
    // Get the selected month and year
    const selectedMonthIndex = selectedMonth.getMonth();
    const selectedYear = selectedMonth.getFullYear();

    // Calculate days in the selected month
    const daysInMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();

    // Generate all dates in the selected month
    const allDates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(selectedYear, selectedMonthIndex, i + 1);
      return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    });

    // Initialize dailyTotals with zero income and expense for all dates
    const dailyTotals = allDates.map(date => ({ date, income: 0, expense: 0 }));

    // Update dailyTotals with actual transactions
    Object.keys(transactionsByDate).forEach(date => {
      const transactions = transactionsByDate[date];
      const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const index = dailyTotals.findIndex(d => d.date === date);
      if (index !== -1) {
        dailyTotals[index] = { date, income, expense };
      }
    });

    return dailyTotals;
  }

  processTransactionsByDate(accounts: Account[]): { [date: string]: Transaction[] } {
    const transactionsByDate: { [date: string]: Transaction[] } = {};

    accounts.forEach(account => {
      account.transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        if (!transactionsByDate[transactionDate]) {
          transactionsByDate[transactionDate] = [];
        }
        transactionsByDate[transactionDate].push(transaction);
      });
    });

    return transactionsByDate;
  }

  calculateTotal(type: categoryType): number {
    return this.accounts.reduce((total: number, account: { transactions: Transaction[]; }) => {
      return total + account.transactions.filter(transaction => transaction.type === type)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    }, 0);
  }


  calculateBalance(transactions: Transaction[]): number {
    return transactions.reduce((balance, transaction) => {
      return balance + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
  }

  showPreviousMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1));
    this.updateCharts();
  }

  showNextMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1));
    this.updateCharts();
  }

  updateCharts(): void {
    const transactionsByDate = this.processTransactionsByDate(this.accounts);
    const dailyTotals = this.calculateDailyTotals(transactionsByDate, this.selectedMonth);
    this.generateChart2(dailyTotals);
  }

  generateChart(dailyTotals: { date: string, income: number, expense: number }[]): void {
    const labelData = this.accounts.map((account) => account.accountType);
    const balanceData = this.accounts.map((account) => account.balance);
    const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
    // generate a doughnut chart 
    this.chartService.RenderChart(labelData, balanceData, colors, 'doughnut', 'accountChart');

    const label2 = ['Income', 'Expense'];
    const data2 = [this.totalIncome, this.totalExpense];
    const color = ['#01F80A', '#E51717'];
    // generate a pie chart 
    this.chartService.RenderChart(label2, data2, color, 'pie', 'incomeExpenseChart');
  }
  generateChart2(dailyTotals: { date: string, income: number, expense: number }[]) {
    // income or expense overflow 
    const labelDaily = dailyTotals.map(d => d.date);
    const incomeData = dailyTotals.map(d => d.income);
    const expData = dailyTotals.map(d => d.expense);
    this.chartService.RenderChart(labelDaily, incomeData, [`rgb(54,162,235)`], "bar", 'dailyIncomeChart')
    this.chartService.RenderChart(labelDaily, expData, [`rgb(55,255,202)`], "bar", 'dailyExpenseChart')
  }
}
