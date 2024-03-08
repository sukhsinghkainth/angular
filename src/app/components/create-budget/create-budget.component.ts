import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { BudgetService } from 'src/app/services/budgetService/budget.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {
  budgetForm: FormGroup;
  categories: any[] = [];
 
  constructor(
     private fb: FormBuilder,
     private categoryService: CategoryService,
     private budgetService: BudgetService,
     private toast: ToastService,
     public dialogRef: MatDialogRef<CreateBudgetComponent>
  ) {
     this.budgetForm = this.fb.group({
       categoryName: ['', Validators.required],
       limit: ['', [Validators.required, Validators.min(0)]]
     });
  }
 
  ngOnInit(): void {
     this.loadCategories();
  }
 
  loadCategories(): void {
     this.categoryService.getCategory("expense").subscribe(response => {
       this.categories = response.body; // Adjust based on the actual response structure
     });
  }
 
  onSubmit(): void {
     if (this.budgetForm.valid) {
       const budgetData = this.budgetForm.value;
       this.budgetService.createBudget(budgetData).subscribe(
         (res: HttpResponse<any>) => {
           this.toast.showToast('success', `${res.body.message}`);
           this.dialogRef.close(true);
         },
         (error: HttpErrorResponse) => {
           this.toast.showToast('error', `${error.error.error}`);
         }
       );
     }
  }
 }