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
  { id: 1, name: 'Vegetables', description: 'Vegetable category' },
  { id: 2, name: 'Trees', description: 'Tree category' },
  { id: 3, name: 'Pests', description: 'Pests category' },
  { id: 4, name: 'Shrubs', description: 'Shrubs category' }
];

const posts: Post[] = [
  { id: 1, title: 'Post 1', description: 'Post 1 Description', content: 'Post 1 content', imageUrl: 'http://localhost:3000/thumbnail?image=gblog-20180704_192334-1594331124043.jpg' },
  { id: 2, title: 'Post 2', description: 'Post 2 Description', content: 'Post 2 content', imageUrl: 'http://localhost:3000/thumbnail?image=gblog-20180823_191434-1594331167306.jpg' },
  { id: 3, title: 'Post 3', description: 'Post 3 Description', content: '' },
  { id: 4, title: 'Post 4', description: 'Post 4 Description', content: '' }
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
        case url.match(/\/category\/\d+$/) && method === 'DELETE':
          return deleteCategory();
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
      categoryDTO.name = category.name;
      categoryDTO.description = category.description;
      return ok(categoryDTO);
    }

    function addCategory() {
      const category = body;
      if (categories.find(x => x.name.toLowerCase() === category.name.toLowerCase())) return error('category is already defined');
      category.id = categories.length + 1;
      categories.push(category);
      return ok(category);
    }

    function deleteCategory() {
      const categoryOld = categories.find(x => x.id === idFromUrl());
      if (!categoryOld) return error('category was not found');
      categories.splice(categories.indexOf(categoryOld),1);
      return ok(categoryOld);
    }

    function updateCategory() {
      const category = body;
      const categoryOld = categories.find(x => x.id === idFromUrl());
      if (!categoryOld) return error('category was not found');
      if (categories.find(x => x.name.toLowerCase() === category.name.toLowerCase()) != categoryOld) return error('category is already defined');
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
      postDTO.title = post.title;
      postDTO.description = post.description;
      return ok(postDTO);
    }

    function addPost() {
      const post = body;
      if (posts.find(x => x.title.toLowerCase() === post.title.toLowerCase())) return error('post is already defined');
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
