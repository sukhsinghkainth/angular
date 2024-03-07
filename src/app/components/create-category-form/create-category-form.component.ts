import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.css'],
})
export class CreateCategoryFormComponent {
  loading = false;
  error = '';
  success = ''; // Change success to be an array of strings
  formCategory: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    // private toast : NgToastService,
    private toast : ToastService,
    public dilogRef : MatDialogRef<CreateCategoryFormComponent>) {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';
    const categoryData = this.formCategory.value
    console.log(this.formCategory.value)
    this.categoryService.createCategory(categoryData).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.message)
      this.success = res.body.message
      console.log(this.success, "here is the success")
      this.loading = false;
      // this.toast.success({ detail: "SUCCESS", summary: this.success, position: 'topCenter' });
      this.toast.showToast("success",this.success)
      setTimeout(() => {
        this.dilogRef.close(true);
        console.log("1 second has passed!");
      }, 500);
    },
      (errors: HttpErrorResponse) => {
        // console.log(error)
        console.log(errors)
        this.error = errors.error.error;
        // this.toast.error({ detail: 'error', summary: this.error, duration: 2000, position: 'topCenter' })
     this.toast.showToast('error',this.error)
        this.loading = false
      });
  }
}
