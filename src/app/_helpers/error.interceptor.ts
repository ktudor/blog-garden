import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

// Integrated with jwt.interceptor.ts

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this.authenticationService.logout();
            location.reload();
          }

          //const error = err.error.message || err.statusText;
          return throwError(err);
        })
      );
    }
}