import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private ApiUrl = 'http://localhost:3000/api/v1'
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error);
  }
  constructor(private http: HttpClient) { }
  createCategory(categoryData: string): Observable<HttpResponse<any>> {
    return this.http.post<{ message: string }>(this.ApiUrl + '/createCategory', categoryData, { observe: 'response' }).pipe(retry(2),
      catchError(this.handleError))
  }
  getCategory(): Observable<HttpResponse<any>> {
    return this.http.get(this.ApiUrl + '/allcategories', { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }
  editCategory(name: string, categoryData: string): Observable<HttpResponse<any>> {
    return this.http.put<{ message: string }>(`${this.ApiUrl}/editCategory/${name}`, categoryData, { observe: 'response' }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
