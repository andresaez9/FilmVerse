import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private myRoutes: { [key: string]: string } = {
    register: '/register',
    login: '/login'
  };

  routeVisibility: { [key: string]: boolean } = {
    register: true,
    login: true
  };
  
  constructor(private router: Router, private auth: AuthService) {
    this.checkRoutes(this.router);
  }

  hasLoggin(): boolean {
    return this.auth.isAuthenticated();
  }
  
  private checkRoutes(router: Router) {
    router.events.subscribe((event) => {
      
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.getMyRoutes().forEach((route) => {

          if (currentRoute === '/') this.routeVisibility[route] = true;
          else this.routeVisibility[route] = !this.myRoutes[route].includes(this.router.url);
        });
      }
    });
  }

  getMyRoutes(): Array<string>{
    return Object.keys(this.myRoutes);
  }
}
