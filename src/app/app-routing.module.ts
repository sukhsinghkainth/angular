import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomapageComponent } from './components/homapage/homapage.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './AuthGurad/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent } from './components/budget/budget.component';

const routes: Routes = [
  {
    path: '',
    component: HomapageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'budgets',
    component: BudgetComponent,
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
