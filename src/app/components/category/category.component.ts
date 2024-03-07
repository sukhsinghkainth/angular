import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { HttpResponse } from '@angular/common/http';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCategoryFormComponent } from '../create-category-form/create-category-form.component';
// import { NgToastService } from 'ng-angular-popup';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']   
})
export class CategoryComponent implements OnInit {
  categories!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'type', 'actions'];
  category: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private categoryService: CategoryService,
    public dialog: MatDialog,
    // private toast: NgToastService
    private toast: ToastService
  ) { }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.categoryService.getCategory().subscribe((categories: HttpResponse<any>) => {
      this.categories = new MatTableDataSource<any>(categories.body);
      this.categories.paginator = this.paginator;
    });
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
  openEditCategoryDialog(category: any): void {
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