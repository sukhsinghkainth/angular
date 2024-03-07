import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  private data = localStorage.getItem('token');
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.data}`
      }
    })
    return next.handle(cloneRequest);
  }
}
