import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCategoryFormComponent } from '../create-category-form/create-category-form.component';
// import { NgToastService } from 'ng-angular-popup';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatPaginator } from '@angular/material/paginator';
import { Icategory } from 'src/app/datatypes/dataTypes';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'type', 'actions', 'delete'];
  typeFilter = '';
  originalCategories: Icategory[] = [];
  category: Icategory[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private categoryService: CategoryService,
    public dialog: MatDialog,
    private toast: ToastService
  ) { }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    
    this.categoryService.getCategory().subscribe((categories: HttpResponse<any>) => {
      this.originalCategories = categories.body 
    console.log(this.originalCategories)
      this.categories = new MatTableDataSource<Icategory>(this.originalCategories);
      this.categories.paginator = this.paginator;
      this.applyFilter()
    });
  }

  deleteCategory(name: string) {
    this.categoryService.deleteCategory(name).subscribe((resp: HttpResponse<any>) => {
      console.log(resp)
      this.toast.showToast("success",resp.body.message)
      this.getCategories()
    }, (error: HttpErrorResponse) => {
      console.log(error.error.error)
      this.toast.showToast("error",error.error.error)
    })
  }

  applyFilter() {
    let filterCategories = this.originalCategories.filter(category => {
      const isTypeMatch = this.typeFilter === '' || category.type === this.typeFilter;
      return isTypeMatch;
    });
    this.categories.data = filterCategories;
  }

  openCreateCategoryModal() {
    const dialogRef = this.dialog.open(CreateCategoryFormComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log("closed")
      this.getCategories()
    });
  }
  openEditCategoryDialog(category: Icategory): void {
    console.log(category)
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '600px',
      data: category
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
        this.toast.showToast("success", "category updated")
      }
    });
  }
}