import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserResponse } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder,
    private router: Router) { 
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value as UserResponse).subscribe(res => {
        console.log('Login')
        this.auth.loggedIn.next(true);
        this.router.navigate(['/home']);
        this.loginForm.reset();
      });
    }
  }
}
