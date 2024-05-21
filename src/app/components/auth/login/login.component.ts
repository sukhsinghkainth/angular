import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  error = '';
  success!: string;
  userform: FormGroup;

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private fb: FormBuilder,
    private toasts: ToastService
  ) {
    this.userform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loading = true;
    this.error = '';
    const { email, password } = this.userform.value;
    console.log(this.userform.value)
    this.auth.login(email, password).subscribe(
      (res: HttpResponse<any>) => {
        const responseData = res.body;
        if (responseData && responseData.token) {
          const token = responseData.token;
          // Save token to local storage
          localStorage.setItem('token', token);
          this.success = res.body.Response.username + " log in successfully"
          this.toasts.showToast("success", this.success)
          this.router.navigate([''])
        } else {
          this.error = 'Invalid response from server';
        }
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.message || 'An error occurred while logging in';
        this.toasts.showToast("error", error.error.message)
        this.loading = false;
      }
    );
  }
}
