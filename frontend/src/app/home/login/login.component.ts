import { Component, Inject, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services.service';
import { HomeComponent } from '../home.component';
import { AlertInterface } from '../../interfaces/IAlert';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'src/app/services/cookie.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  host: {
    class: 'login-component'
  },
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  template: `

    <div id="login-body-component">
    <h1 id="login-component-title"> Login </h1>
    <form id="login-component-form">

        <div class="login-component-formInputBody">
          <input type="text" class="login-component-formInput" placeholder="Username" (focusout)="onFocusOutUsername($event)">
      </div>
      <div class="login-component-formInputBody">
        <input type="password" class="login-component-formInput" placeholder="Password" (focusout)="onFocusOutPassword($event)">
      </div>

      <div id="login-component-formButtonBody">
        <input type="Button" id="login-component-formButton" value="Sign In" (click)="login()" >
      </div>


        <div id="login-component-signUpBody">
          <p> Not a User?
          <button class="link" (click)="clickButton('/register')">Sign In</button>

          </p>
        </div>
    </form>

  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  alert: AlertInterface
  _injector = this.viewContainerRef.parentInjector;
  _parent: HomeComponent = this._injector.get<HomeComponent>(HomeComponent);

  userService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);


  constructor(private viewContainerRef: ViewContainerRef, private router: Router, private _snackBar: MatSnackBar) {
    this.alert = {} as AlertInterface;

  }
  clickButton(path: string) {
    this.router.navigate([path]);
  }

  onFocusOutUsername(event: any) {
    this.username = event.target.value
  }
  onFocusOutPassword(event: any) {
    this.password = event.target.value
  }


  login() {

    if (this.username && this.password) {
      this.userService.login(this.username, this.password).then((response) => {


        this.cookieService.set("USERID", response.user.idUsuario);

        if (response.resultado.statusCode == "404") {


          this.openSnackBar(response.resultado.statusText, "undo")

        } else if (response.resultado.statusCode == "200") {
          this.cookieService.set("SESSIONID", response.user.token);
          this.openSnackBar("Welcome " + response.user.username , "Close")
          this.clickButton('/homePage')

        }
      });
    } else {
      this.openSnackBar("Username and password cannot be null", "Close")

    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }

}
