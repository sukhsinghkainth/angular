import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'type', 'category', 'categoryType', 'amount', 'notes'];
  typeFilter = '';
  accountTypeFilter = '';
  originalTransactions: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getTransactions();
  }
  constructor(private transactionService: TransactionService,
    public dialog: MatDialog) { }
  openCreateCategoryModal() {
    const dialogRef = this.dialog.open(CreateTransactionComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log("closed")
      this.getTransactions()
    });
  }
  getTransactions() {
    this.transactionService.allTransactions().subscribe((transactions: HttpResponse<any>) => {
      console.log(transactions)
      this.originalTransactions = transactions.body
      this.transactions = new MatTableDataSource<any>(this.originalTransactions)
      // this.transactions._filterData
      this.transactions.paginator = this.paginator;
      this.applyFilters()
    })
  }
  applyFilters() {
   // Otherwise, apply the filters
      let filteredTransactions = this.originalTransactions.filter(transaction => {
        const isTypeMatch = this.typeFilter === '' || transaction.type === this.typeFilter;
        const isAccountTypeMatch = this.accountTypeFilter === '' || transaction.account.accountType === this.accountTypeFilter;
        return isTypeMatch && isAccountTypeMatch;
      });
      this.transactions.data = filteredTransactions;
  }
}
