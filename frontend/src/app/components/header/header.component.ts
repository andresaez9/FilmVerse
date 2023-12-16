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

  constructor(private auth: AuthService) { 
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

  isLogged(): boolean {
    return (this.auth.isLoggedIn() || localStorage.getItem('loggedIn') == 'true')
  }

  logout(): void {
    this.auth.logout();
  }

  get userName() {
    return this._userName;
  }
}
