import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/interfaces/user.interface';

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
    const newName: string = JSON.parse(localStorage.getItem('user')!).name;

    const updateUser: User = { ...this.auth._userSubject.value, name: newName };
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
