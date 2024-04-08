import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Icategory } from 'src/app/datatypes/dataTypes';
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
  success = '';
  formCategory: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toast: ToastService,
    public dilogRef: MatDialogRef<CreateCategoryFormComponent>) {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.success = '';
    const categoryData = this.formCategory.value as Icategory
    console.log(this.formCategory.value)
    this.categoryService.createCategory(categoryData).subscribe((res: HttpResponse<Icategory>) => {
      console.log(res.body?.message)
      this.success = res.body?.message ?? "";
      console.log(this.success, "here is the success")
      this.loading = false;
      this.toast.showToast("success", this.success)

      setTimeout(() => {
        this.dilogRef.close(true);
        console.log("1 second has passed!");
      }, 500);
    },
      (errors: HttpErrorResponse) => {
        console.log(errors)
        this.error = errors.error.error;
        this.toast.showToast('error', this.error)
        this.loading = false
      });
  }
}
