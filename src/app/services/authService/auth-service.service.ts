import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private ApiUrl = 'http://localhost:3000/api/v1'
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  signup(userData: string): Observable<HttpResponse<any>> {
    return this.http.post<{ message: string }>(this.ApiUrl + '/signup', userData, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError))
  }
  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<{ message: string }>(this.ApiUrl + '/login', { email, password }, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError))
  }
  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
  loggedOut() {
    return localStorage.removeItem('token');
  }
}
