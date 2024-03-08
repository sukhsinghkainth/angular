import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private ApiUrl = 'http://localhost:3000/api/v1'
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  getAccounts(): Observable<HttpResponse<any>> {
    return this.http.get(this.ApiUrl + '/account', { observe: 'response' }).pipe(
      catchError(this.handleError)
    )
  }
}
