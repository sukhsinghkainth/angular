import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Icategory } from 'src/app/datatypes/dataTypes';
import { BudgetService } from 'src/app/services/budgetService/budget.service';

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})
export class EditBudgetComponent implements OnInit {

  budgetForm!: FormGroup;
  error = "";
  constructor(public dilogRef: MatDialogRef<EditBudgetComponent>,
    private BudgetService: BudgetService,

    @Inject(MAT_DIALOG_DATA) public data: Icategory,
    private fb: FormBuilder
  ) {
    this.budgetForm = this.fb.group({
      categoryName: [data.name, Validators.required],
      limit: ['', Validators.required]
    });
    if (data) {
      this.budgetForm.patchValue(data);
      console.log(data);
    }
  }

  ngOnInit(): void {

  }
  onSubmit(): void {
    console.log(this.budgetForm.value)
    this.BudgetService.updateBudget(this.budgetForm.value).subscribe((res: HttpResponse<any>) => {
      this.dilogRef.close(true);
    },
      (error: HttpErrorResponse) => {
        console.log(this.error)
      }
    )
  }
} 
