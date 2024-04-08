import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly ApiUrl = 'http://localhost:3000/api/v1'
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  get<T>(endpoint: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.ApiUrl}/${endpoint}`, { observe: 'response' }).pipe(
      catchError(this.handleError))
  }
  delete<T>(endpoint: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(`${this.ApiUrl}/${endpoint}`, { observe: 'response' }).pipe(
      catchError(this.handleError))
  }
  update<T>(endpoint: string, data: T) {
    return this.http.put<T>(`${this.ApiUrl}/${endpoint}`, data, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError))
  }
  post<T>(endpoint: string, data: T): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${this.ApiUrl}/${endpoint}`, data, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError))
  }
}