import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  private _userName: string = JSON.parse(localStorage.getItem('user')!).name;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    /*this.auth.userSubject.subscribe(user => {
      this._userName = user.name!;
    });*/
  }

  /*hasTokken(): boolean {
    return this.auth.hasToken();
  }*/

  isLogged(): boolean {
    //return this.auth.loggedIn.getValue();

    return (this.auth.loggedIn.getValue() || localStorage.getItem('loggedIn') == 'true')
  }

  logout(): void {
    this.auth.logout();
  }

  get userName() {
    return this._userName;
  }
}
