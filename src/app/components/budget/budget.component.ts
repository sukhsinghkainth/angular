// src/app/budget/budget.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetService } from 'src/app/services/budgetService/budget.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CreateBudgetComponent } from '../create-budget/create-budget.component';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgets!: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoryName', 'categoryType', 'limit', 'remainingLimit', 'spent', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private budget: BudgetService,
    private toast: ToastService,
    public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budget.allBudgets().subscribe((response: any) => {
      console.log(response)
      this.budgets = new MatTableDataSource<any>(response.body.budget);
      this.budgets.paginator = this.paginator;
    });
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

  openEditBudget(budget: any): void {
    console.log(budget)
    console.log(budget.category.name)
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
