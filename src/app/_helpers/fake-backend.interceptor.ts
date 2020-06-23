import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, RoleEnum, Category, Post } from '@app/_models';
import { AuthenticationService } from '@app/_services';

const users: User[] = [
  { id: 1, email: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: RoleEnum.Admin },
  { id: 2, email: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: RoleEnum.User },
  { id: 3, email: 'tester', password: 'tester', firstName: 'Testing', lastName: 'User', role: RoleEnum.Tester }
];

const categories: Category[] = [
  { id: 1, catName: 'Vegetables', catDesc: 'Vegetable category' },
  { id: 2, catName: 'Trees', catDesc: 'Tree category' },
  { id: 3, catName: 'Pests', catDesc: 'Pests category' },
  { id: 4, catName: 'Shrubs', catDesc: 'Shrubs category' }
];

const posts: Post[] = [
  { id: 1, postTitle: 'Post 1', postDesc: 'Post 1 Description', postContent: '' },
  { id: 2, postTitle: 'Post 2', postDesc: 'Post 2 Description', postContent: '' },
  { id: 3, postTitle: 'Post 3', postDesc: 'Post 3 Description', postContent: '' },
  { id: 4, postTitle: 'Post 4', postDesc: 'Post 4 Description', postContent: '' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      var test = url.match(/\/category\/\d+$/);
      var id = idFromUrl();
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.endsWith('/category') && method === 'GET':
          return getCategories();
        case url.match(/\/category\/\d+$/) && method === 'GET':
          return getCategoryById();
        case url.endsWith('/category') && method === 'POST':
          return addCategory();
        case url.match(/\/category\/\d+$/) && method === 'PUT':
          return updateCategory();
        case url.endsWith('/post') && method === 'GET':
          return getPosts();
        case url.match(/\/post\/\d+$/) && method === 'GET':
          return getPostById();
        case url.endsWith('/post') && method === 'POST':
          return addPost();
        case url.match(/\/post\/\d+$/) && method === 'PUT':
          return updatePost();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) return error('email or password is incorrect');
      return ok({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
      });
    }

    function register() {
      const user = body;
      if (users.find(x => x.email === user.email)) return error('email is already registered');
      user.id = users.length + 1;
      users.push(user);
      return ok({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
      });
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      // only admins can access other user records
      if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    function getCategories() {
      return ok(categories);
    }

    function getCategoryById() {
      const category = categories.find(x => x.id === idFromUrl());
      var categoryDTO: Category = new Category();
      categoryDTO.id = category.id;
      categoryDTO.catName = category.catName;
      categoryDTO.catDesc = category.catDesc;
      return ok(categoryDTO);
    }

    function addCategory() {
      const category = body;
      if (categories.find(x => x.catName.toLowerCase() === category.catName.toLowerCase())) return error('category is already defined');
      category.id = categories.length + 1;
      categories.push(category);
      return ok(category);
    }

    function updateCategory() {
      const category = body;
      const categoryOld = categories.find(x => x.id === idFromUrl());
      if (!categoryOld) return error('category was not found');
      categories[categories.indexOf(categoryOld)] = category;
      return ok(category);
    }

    function getPosts() {
      return ok(posts);
    }

    function getPostById() {
      const post = posts.find(x => x.id === idFromUrl());
      var postDTO: Post = new Post();
      postDTO.id = post.id;
      postDTO.postTitle = post.postTitle;
      postDTO.postDesc = post.postDesc;
      return ok(postDTO);
    }

    function addPost() {
      const post = body;
      if (posts.find(x => x.postTitle.toLowerCase() === post.postTitle.toLowerCase())) return error('post is already defined');
      post.id = posts.length + 1;
      posts.push(post);
      return ok(post);
    }

    function updatePost() {
      const post = body;
      const postOld = posts.find(x => x.id === idFromUrl());
      if (!postOld) return error('post was not found');
      posts[posts.indexOf(postOld)] = post;
      return ok(post);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } });
    }

    function error(message: String) {
      return throwError({ status: 400, error: { message } });
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === RoleEnum.Admin;
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return users.find(x => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}
