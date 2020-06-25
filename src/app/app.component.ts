import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Category, User, RoleEnum } from '@app/_models';
import { AuthenticationService, CategoryService } from '@app/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-garden';
  categories: Category[] = [];
  user: User = null;

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient
    ) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    /*
    this.categoryService.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
    */
  }

  get isLoggedIn() {
    return this.user;
  }

  get isAdmin() {
    return this.user && this.user.role === RoleEnum.Admin;
  }

  get isTester() {
    return this.user && this.user.role === RoleEnum.Tester;
  }

  logout() {
      this.authenticationService.logout();
  }
  
  throwError(){
    throw new Error('My Pretty Error');
  }

  throwInvalidHttpError(){
    // Need .subscribe for async call
    //this.http.get('urlhere');
    this.http.get('urlhere').subscribe();
  }
}
