import { Injectable } from '@angular/core';
import { Budget, Icategory } from 'src/app/datatypes/dataTypes';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private http: HttpService) { }
  createBudget(budgetData: Icategory) {
    return this.http.post<Icategory>("setBudget", budgetData)
  }
  allBudgets() {
    return this.http.get<Budget>("view-budgets")
  }
  deleteBudget(data: Budget) {
    return this.http.delete<Budget>(`deleteBudget/${data}`)
  }
  updateBudget(data: any) {
    return this.http.update<Budget>("updateBudget", data)
  }
}
