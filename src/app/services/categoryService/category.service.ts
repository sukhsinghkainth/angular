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
  deleteCategory(name : string):Observable<HttpResponse<any>>{
     return this.http.delete(this.ApiUrl+`/deleteCategory/${name}`,{observe:'response'}).pipe(
      catchError(this.handleError)
     )
  }
  getCategory(categoryType?: string): Observable<HttpResponse<any>> {
    let query = `${"/allcategories"}`
    if (categoryType) {
      query = `/allcategories/${categoryType}`
    }
    return this.http.get(this.ApiUrl + query, { observe: 'response' }).pipe(
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
