import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Icategory, Transaction } from 'src/app/datatypes/dataTypes';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  form !: FormGroup;
  type: string = '';
  categories: Icategory[] = [];
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
    private transactionService: TransactionService,
    private toast: ToastService,
    public dilogRef: MatDialogRef<CreateTransactionComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      amount: [''],
      notes: [''],
      type: [''],
      accountType: [''],
      categoryName: ['']
    });

    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategory().subscribe((response) => {
      this.categories = Array.isArray(response.body) ? response.body : []
    });
  }
  onSubmit() {
    console.log(this.form.value);
    const data = this.form.value as Transaction
    this.transactionService.createTransaction(data).subscribe((res) => {
      const success = res.body?.message
      this.toast.showToast('success', `${success}`)
      setTimeout(() => {
        this.dilogRef.close(true);
      }, 900);

    }, (errors: HttpErrorResponse) => {
      console.log(errors)
      this.toast.showToast("error", `${errors.error.error}`)
    })
  }
  onTypeChange() {
    this.type = this.form.get('type')?.value;
  }
  getFilteredCategories(type: string): Icategory[] {
    return this.categories.filter(c => c.type === type);
  }
}
