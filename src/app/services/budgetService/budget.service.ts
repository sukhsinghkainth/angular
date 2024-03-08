import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  createBudget(budgetData: any): Observable<HttpResponse<any>> {
    console.log(budgetData);
    return this.http.post<{ message: string }>(this.ApiUrl + '/setBudget', budgetData, { observe: 'response' }).pipe(retry(2),
    catchError(this.handleError))
  }
  private ApiUrl = 'http://localhost:3000/api/v1'
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  constructor(private http: HttpClient) { }
  allBudgets(): Observable<HttpResponse<any>> {
    return this.http.get(this.ApiUrl + '/view-budgets', { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  updateBudget(data:any) {
  const {categoryName , limit } = data
  categoryName as string
    return this.http.put<{ message: string }>(this.ApiUrl + '/updateBudget', {
       categoryName,limit
    }, { observe: 'response' }).pipe(
      retry(2),

      catchError(this.handleError)
    )
  }
}
