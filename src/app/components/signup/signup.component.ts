import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loading = false;
  error = '';
  success: string[] = []; // Change success to be an array of strings
  userform: FormGroup;
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private fb: FormBuilder,
    private toast : ToastService) {
    this.userform = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onsubmit() {
    this.loading = true;
    this.error = '';
    this.success = [];
    const userData = this.userform.value;
    this.auth.signup(userData).subscribe((res: HttpResponse<any>) => {
      console.log(res.body.message)
      this.success = res.body.messaage
      this.toast.showToast('success', this.success)
      this.loading = false;
      this.router.navigate(['/login']);
    },
      (errors: HttpErrorResponse) => {
        console.log(errors)
        this.error = errors.error.error;
        this.loading = false
      });
  }
}
