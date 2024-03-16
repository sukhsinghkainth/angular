// src/app/budget/budget.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetService } from 'src/app/services/budgetService/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Budget } from 'src/app/datatypes/dataTypes';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgets!: MatTableDataSource<Budget>;
  displayedColumns: string[] = ['categoryName', 'categoryType', 'limit', 'remainingLimit', 'spent', 'actions', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private budget: BudgetService,
    private toast: ToastService,
    public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budget.allBudgets().subscribe((response: HttpResponse<any>) => {
      console.log(response)
      this.budgets = new MatTableDataSource<Budget>(response.body.budget);
      this.budgets.paginator = this.paginator;
    });
  }
  deleteBudget(data: Budget) {
    this.budget.deleteBudget(data).subscribe((resp: HttpResponse<any>) => {
      this.toast.showToast('success', resp.body.message)
      this.getBudgets();
    }, (error: HttpErrorResponse) => {
      this.toast.showToast('error', error.error.error)
    })
  }
  AddnewBudgetModal() {
    const dialogRef = this.dialog.open(CreateBudgetComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log("closed")
      this.getBudgets();
    });
  }

  openEditBudget(budget: Budget): void {
    const dialogRef = this.dialog.open(EditBudgetComponent, {
      width: '600px',
      data: { categoryName: budget.category.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBudgets()
        this.toast.showToast("success", "budget updated successfully")
      }
    });
  }
}
