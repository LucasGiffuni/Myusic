import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services.service';
import { HomeComponent } from '../home.component';
import { AlertInterface } from '../../interfaces/IAlert';
import { Router } from '@angular/router';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: `
    <div id="register-body-component">
    <h1 id="register-component-title"> Register </h1>
    <form id="register-component-form">

      <div class="register-component-formInputBody">
        <input type="text" class="register-component-formInput" placeholder="Username" (focusout)="onFocusOutUsername($event)">
      </div>
      <div class="register-component-formInputBody">
        <input type="password" class="register-component-formInput" placeholder="Password" (focusout)="onFocusOutPassword($event)">
      </div>

      <div id="register-component-formButtonBody">
        <input type="Button" id="register-component-formButton" value="Sign Up" (click)="login()" >
      </div>


        <div id="register-component-signUpBody">
          <p> Have an user?
          <button class="link" (click)="clickButton('/login')">Log In</button>

          </p>
        </div>
    </form>

  </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";

  alert: AlertInterface
  _injector = this.viewContainerRef.parentInjector;
  _parent: HomeComponent = this._injector.get<HomeComponent>(HomeComponent);

  userService: Services = inject(Services);

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
      this.userService.register(this.username, this.password).then((response) => {
        console.log(response)

        if (response.resultado.statusCode == "404") {
          this.openSnackBar(response.resultado.statusText, "undo")

        } else if (response.resultado.statusCode == "200") {



          this.openSnackBar("Usuario " + response.user.username + " creado correctamente", "Close")

          this.clickButton('/login')

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
