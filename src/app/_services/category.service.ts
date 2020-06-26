import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Category, Notification, NotificationEnum } from '@app/_models';

const apiUrl = `${environment.apiUrl}/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl).pipe(
      // TODO remove old code; do we need pipe?
      //tap(_ => this.log('fetched Categories')),
      catchError(err => {
        throw new Notification('category.service', 'getCategories', err.error.message, NotificationEnum.Error);
      })
    );
  }

  getCategory(id: any): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      //tap(_ => console.log(`fetched category by id=${id}`)),
      catchError(err => {
        throw new Notification('category.service', 'getCategory', err.error.message, NotificationEnum.Error);
      })
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(apiUrl, category).pipe(
      tap((prod: Category) => {
        // This message is being caught in catchError below
        //throw new Notification('category.service', 'addCategory', `added category w/ id=${category.id}`, NotificationEnum.Information);
      }),
      catchError(err => {
        throw new Notification('category.service', 'addCategory', err.error.message, NotificationEnum.Error);
      })
    );
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${apiUrl}/${category.id}`;
    return this.http.put(url, category).pipe(
      //tap((prod: Category) => {
        // This message is being caught in catchError below
        //throw new Notification('category.service', 'updateCategory', `updated category w/ id=${category.id}`, NotificationEnum.Information);
      //}),
      catchError(err => {
        throw new Notification('category.service', 'updateCategory', err.error.message, NotificationEnum.Error);
      })
    );
  }

  deleteCategory(id: any): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Category>(url).pipe(
      //tap(_ => console.log(`deleted category id=${id}`)),
      catchError(err => {
        throw new Notification('category.service', 'deleteCategory', err.error.message, NotificationEnum.Error);
      })
    );
  }

  /* notification.handler takes care of logging
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private logError(operation: string, message: string) {
    console.log(`${operation} failed: ${message}`);
  }

  private log(message: string) {
    console.log(message);
  }
  */
}