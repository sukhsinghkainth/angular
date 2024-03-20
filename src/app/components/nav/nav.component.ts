import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  ngOnInit(): void {

  }
  constructor(private auth: AuthServiceService, private router: Router,
    private toast : ToastService) {

  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  logOut() {
    this.auth.loggedOut();
    console.log('logged out')
    this.toast.showToast("success","logged out")
    this.router.navigate(['login'])
  }
}
