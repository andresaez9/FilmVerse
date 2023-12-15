import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ProfileService } from 'src/app/services/profile.service';

declare const bootstrap: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @ViewChild('deleteUserModal') deleteUserModal!: ElementRef;
  private _users: User[] = [];
  private _idUser: number = 0;

  constructor(private profileService: ProfileService) {
  }
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.profileService.getAllUsers().subscribe(
      res => {
        console.log('LIsta de usuarios: ', res);
        const userStorage = localStorage.getItem('user');
        const idUser = JSON.parse(userStorage!).id_user;
        
        if (idUser) {
          const index = res.findIndex(user => user.id_user === idUser);
          res.splice(index, 1);
          this._users = res;
        }
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  openModal(id: number): void {
    const modal = new bootstrap.Modal(this.deleteUserModal.nativeElement);
    modal.show();
    this._idUser = id;
  }

  deleteUser(): void {
    this.profileService.deleteUser(this.idUser).subscribe(
      res => {
        console.log('Usuario eliminado: ', res);
        this.getAll();
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  get idUser(): number {
    return this._idUser;
  }

  get users(): User[] {
    return this._users;
  }
}
