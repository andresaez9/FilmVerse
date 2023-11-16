import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  private _userName: string = '';
  userSubscription: Subscription;

  constructor(private auth: AuthService, private location: Location) { 
    this.userSubscription = this.auth.userSubject.subscribe(user => {
      this._userName = user.name || '';
    });
  }

  ngOnInit(): void {
    this.changeNewName();
  }

  changeNewName() {
    const newName = JSON.parse(localStorage.getItem('user')!).name;

    const updateUser = { ...this.auth._userSubject.value, name: newName };
    this.auth._userSubject.next(updateUser);

    this._userName = newName;
  }

  /*hasTokken(): boolean {
    return this.auth.hasToken();
  }*/

  isLogged(): boolean {
    //return this.auth.loggedIn.getValue();

    return (this.auth.isLoggedIn() || localStorage.getItem('loggedIn') == 'true')
  }

  logout(): void {
    this.auth.logout();
  }

  private reloadPage(): void {
    this.location.go(this.location.path());
  }

  get userName() {
    return this._userName;
  }
}
