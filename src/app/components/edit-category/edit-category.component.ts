import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  sucess!: string;
  error = '';
  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      type: ['', Validators.required]
    });

    if (data) {
      this.categoryForm.patchValue(data);
      console.log(data)
    }
  }

  ngOnInit(): void { }

  onSubmit(): void {
    console.log("herer")
    this.categoryService.editCategory(this.data.name, this.categoryForm.value).subscribe((res: HttpResponse<any>) => {
      console.log(res)
      this.dialogRef.close(true);
    },
      (error: HttpErrorResponse) => {
        this.error = error.error.message || 'An error occurred while logging in';
      }
    );
  }

}
