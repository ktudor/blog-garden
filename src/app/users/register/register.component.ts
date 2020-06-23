import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthenticationService } from '@app/_services';
import { Role, User } from '@app/_models';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  role: Role = Role.User;

  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  submitted = false;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null, Validators.required],
      firstName : [null, Validators.required],
      lastName : [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.isLoadingResults = true;

    let user: User = new User();
    user.email =  this.f.email.value;
    user.password = this.f.password.value;
    user.firstName = this.f.firstName.value;
    user.lastName = this.f.lastName.value;

    this.authenticationService.register(user)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/']);
            },
            error => {
                this.error = error;
                this.isLoadingResults = false;
            });

            /*
    this.authenticationService.register(form)
      .subscribe(res => {
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
      */
  }

}
