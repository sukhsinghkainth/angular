import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomapageComponent } from './components/homapage/homapage.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CustomInterceptor } from './services/interceptor/custom.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { CreateCategoryFormComponent } from './components/category/create-category-form/create-category-form.component'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CreateTransactionComponent } from './components/transactions/create-transaction/create-transaction.component';
import { NgToastModule } from 'ng-angular-popup';
import { BudgetComponent } from './components/budget/budget.component';
import { EditBudgetComponent } from './components/budget/edit-budget/edit-budget.component';
import { AccountsComponent } from './components/accounts/accounts.component'
import { MatCardModule } from '@angular/material/card';
import { CreateBudgetComponent } from './components/budget/create-budget/create-budget.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

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
    AccountsComponent,
    CreateBudgetComponent,],
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
    NgToastModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
