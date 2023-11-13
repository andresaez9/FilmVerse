import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  userName: string = '';
  showSearch: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.userValue.subscribe(user => {
      this.userName = user.name!;
    });
  }

  hasTokken(): boolean {
    return this.auth.hasToken();
  }

  logout(): void {
    this.auth.logout();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
