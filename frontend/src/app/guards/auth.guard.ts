import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asumiendo que tienes un servicio AuthService para gestionar la autenticación

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //return this.authService.isLoggedIn() || this.router.createUrlTree(['/']); <- sin localStorage

    /*if (this.authService.loggedIn.getValue() || localStorage.getItem('loggedIn') == 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }*/

    return (this.authService.loggedIn.getValue() || localStorage.getItem('loggedIn') == 'true')
     || this.router.navigate(['/']);
  }
}
