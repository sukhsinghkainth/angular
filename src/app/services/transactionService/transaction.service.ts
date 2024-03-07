import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private ApiUrl = 'http://localhost:3000/api/v1'
  constructor(private http: HttpClient,) { }
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  allTransactions(): Observable<HttpResponse<any>> {
    return this.http.get(this.ApiUrl + '/alltransaction', { observe: 'response' }).pipe(
      catchError(this.handleError)
    )
  }
  createTransaction(data: any): Observable<HttpResponse<any>> {
    return this.http.post<{ message: string }>(this.ApiUrl + '/transaction', data, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError)
    )
  }
}
