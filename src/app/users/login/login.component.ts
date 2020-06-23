import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthenticationService } from '@app/_services';
import { HttpErrorResponse } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  /*
  email = '';
  password = '';
  isLoadingResults = false;
  */
  
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.userValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoadingResults = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoadingResults = false;
          // TODO: Remove comment
          // return redirectURL instead of user
          //  this.router.navigate([this.authenticationService.redirectUrl]);
          if (data) {
            this.router.navigate([data]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.isLoadingResults = false;
          throw new Error(error.error.message);
        });
  }

  register() {
    this.router.navigate(['users/register']);
  }
}
