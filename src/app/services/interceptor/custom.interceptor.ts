import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthServiceService } from '../authService/auth-service.service';


@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  private data = localStorage.getItem('token');
  constructor(private auth: AuthServiceService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.data !== null) {
      const decodedToken: any = jwtDecode(this.data);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        this.auth.loggedOut();
        throw new Error("Not authenticated out")
      }
    }
    const cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.data}`
      }
    })
    return next.handle(cloneRequest);
  }
}
