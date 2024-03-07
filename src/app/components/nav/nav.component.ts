import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  ngOnInit(): void {

  }
  constructor(private auth: AuthServiceService, private router: Router) {

  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  logOut() {
    this.auth.loggedOut();
    console.log('logged out')

    this.router.navigate(['login'])
  }
}
