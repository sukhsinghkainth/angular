import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { Router } from '@angular/router';

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

  // userform: FormGroup = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private fb: FormBuilder) {
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
