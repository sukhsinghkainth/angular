import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  form !: FormGroup;
  type: string = '';
  categories: any[] = [];
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
    this.categoryService.getCategory().subscribe(response => {
      this.categories = response.body; // Adjust based on the actual response structure

    });
  }
  onSubmit() {
    console.log(this.form.value);
    this.transactionService.createTransaction(this.form.value).subscribe((res: HttpResponse<any>) => {
      this.toast.showToast('success', `${res.body.message}`)
      console.log(res)
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
  getFilteredCategories(type: string): any[] {
    return this.categories.filter(c => c.type === type);
  }
}
