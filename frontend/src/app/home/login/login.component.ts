import { Component, Inject, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services.service';
import { HomeComponent } from '../home.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'src/app/services/cookie.service';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login',
  host: {
    class: 'login-component',
  },
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  template: `
    <div id="login-body-component">
      <h1 id="login-component-title">Login</h1>
      <form id="login-component-form" (keydown.enter)="login()" >
        <div class="login-component-formInputBody">
          <input
            type="text"
            class="login-component-formInput"
            placeholder="Username"
            (input)="onFocusOutUsername($event)"
          />
        </div>
        <div class="login-component-formInputBody">
          <input
            type="password"
            class="login-component-formInput"
            placeholder="Password"
            (input)="onFocusOutPassword($event)"
          />
        </div>

        <div id="login-component-formButtonBody">
          <input

            type="Button"
            id="login-component-formButton"
            value="Sign On"
            (click)="login()"
          />
        </div>

        <div id="login-component-signUpBody">
          <p>
            Not a User?
            <input class="link" (click)="clickButton('/register')" value=" Sign In" >


          </p>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  _injector = this.viewContainerRef.parentInjector;
  _parent: HomeComponent = this._injector.get<HomeComponent>(HomeComponent);

  userService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);
  loginService: UserService = inject(UserService);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }
  clickButton(path: string) {
    this.router.navigate([path]);
  }

  onFocusOutUsername(event: any) {
    this.username = event.target.value;
  }
  onFocusOutPassword(event: any) {
    this.password = event.target.value;
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      // rest of your code
    }
  }
  login() {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password).then((response) => {
        this.cookieService.set('USERID', response.user.idUsuario);

        if (response.resultado.statusCode == '404') {
          this.openSnackBar(response.resultado.statusText, 'undo');
        } else if (response.resultado.statusCode == '200') {
          this.cookieService.set('SESSIONID', response.user.token);
          this.openSnackBar('Welcome ' + response.user.username, 'Close');
          this.clickButton('/homePage');
          this.loginService.loginFlag = true;
        }
      });
    } else {
      this.openSnackBar('Username and password cannot be null', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
