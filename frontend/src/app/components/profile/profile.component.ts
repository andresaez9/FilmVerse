import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

declare const bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @ViewChild('deleteUserModal') deleteUserModal!: ElementRef;
  private _updateUserForm: FormGroup;
  private _userType: string = localStorage.getItem('type')!;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private authService: AuthService, private router: Router) {
    this._updateUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const idUser = JSON.parse(user!).id_user;
    console.log('idUser: ', idUser);
    
    //servicio funcion que obtenga el usuario a traves del id.
    this.profileService.getUserById(idUser).subscribe(
      res => {
        console.log('res: ', res);        
        
        this.updateUserForm.patchValue({
          name: res.user.name,
          surname: res.user.surname,
          email: res.user.email,
        });
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  openModal(): void {  
    const modal = new bootstrap.Modal(this.deleteUserModal.nativeElement);
    modal.show();
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      const user = localStorage.getItem('user');
      const idUser = JSON.parse(user!).id_user;
      console.log('idUser: ', idUser);
      console.log('updateUserForm: ', this.updateUserForm.value);
      
      this.profileService.updateUser(idUser, this.updateUserForm.value).subscribe(
        res => {
          console.log('res: ', res);
          localStorage.setItem('user', JSON.stringify(res));
        },
        err => {
          console.log('err: ', err);
        }
      );
    }
  }

  deleteUser() {
    const user = localStorage.getItem('user');
    const idUser = JSON.parse(user!).id_user;
    
    this.profileService.deleteUser(idUser).subscribe(
      res => {
        console.log('Usuario Borrado: ', res);
        this.authService.logout();
        this.router.navigate(['/']);
      },
      err => {
        console.log('err: ', err);
      }
    );
  }

  get updateUserForm(): FormGroup {
    return this._updateUserForm;
  }

  get userType(): string {
    return this._userType;
  }
}
