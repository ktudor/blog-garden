import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Post, Notification, NotificationEnum } from '@app/_models';

const apiUrl = '${environment.apiUrl}/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl).pipe(
      // TODO remove old code; do we need pipe?
      //tap(_ => this.log('fetched posts')),
      catchError(err => {
        throw new Notification('post.service', 'getPosts', err.error.message, NotificationEnum.Error);
      })
    );
  }

  getPost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      //tap(_ => console.log(`fetched post by id=${id}`)),
      catchError(err => {
        throw new Notification('post.service', 'getPost', err.error.message, NotificationEnum.Error);
      })
    );
  }

  // TODO: are we still using this? called from bycategory.component
  getPostsByCategory(id: any): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl + 'bycategory/' + id).pipe(
      //tap(_ => this.log('fetched Posts')),
      catchError(err => {
        throw new Notification('post.service', 'getPostsByCategory', err.error.message, NotificationEnum.Error);
      })
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(apiUrl, post).pipe(
      //tap((prod: Post) => console.log(`added post w/ id=${post.id}`)),
      catchError(err => {
        throw new Notification('post.service', 'addPost', err.error.message, NotificationEnum.Error);
      })
    );
  }

  updatePost(id: any, post: Post): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post).pipe(
      //tap(_ => console.log(`updated post id=${id}`)),
      catchError(err => {
        throw new Notification('post.service', 'updatePost', err.error.message, NotificationEnum.Error);
      })
    );
  }

  deletePost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Post>(url).pipe(
      //tap(_ => console.log(`deleted post id=${id}`)),
      catchError(err => {
        throw new Notification('post.service', 'deletePost', err.error.message, NotificationEnum.Error);
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