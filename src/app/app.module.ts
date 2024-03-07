import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomapageComponent } from './components/homapage/homapage.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { CustomInterceptor } from './services/interceptor/custom.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { CreateCategoryFormComponent } from './components/create-category-form/create-category-form.component'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { NgToastModule } from 'ng-angular-popup';
import { BudgetComponent } from './components/budget/budget.component';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component' // to be added

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomapageComponent,
    NavComponent,
    LoginComponent,
    CreateCategoryFormComponent,
    CategoryComponent,
    EditCategoryComponent,
    TransactionsComponent,
    CreateTransactionComponent,
    BudgetComponent,
    EditBudgetComponent,
    
    
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    MatTableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
