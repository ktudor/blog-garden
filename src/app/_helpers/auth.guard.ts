import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;

      return this.checkLogin(url, route);
  }

  checkLogin(url: string, route: ActivatedRouteSnapshot): boolean {
    const user = this.authenticationService.userValue;
    if (!user) {
      // Store the attempted URL for redirecting
      this.authenticationService.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['/users/login']);
      return false;
    } else {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorized so return true
        return true;
    }
  }
}