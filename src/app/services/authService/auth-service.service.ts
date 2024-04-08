import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private router: Router, private http: HttpService) { }
  signup(userData: string) {
    return this.http.post("signup", userData)
  }
  login(email: string, password: string) {
    return this.http.post("login", { email, password })
  }
  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
  loggedOut() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
}
