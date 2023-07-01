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
    <form id="register-component-form" (keydown.enter)="login()">

      <div class="register-component-formInputBody">
        <input type="text" class="register-component-formInput" placeholder="Username" (input)="onInputUsername($event)">
      </div>
      <div class="register-component-formInputBody">
        <input type="password" class="register-component-formInput" placeholder="Password" (input)="onInputPassword($event)">

      </div>

      <div id="register-component-formButtonBody">
        <input type="Button" id="register-component-formButton" value="Sign Up" (click)="login()" >
      </div>


        <div id="register-component-signUpBody">
          <p> Have an user?
            <input class="link" (click)="clickButton('/login')" value=" Log In" >

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

  onInputUsername(event: any) {
    this.username = event.target.value
  }
  onInputPassword(event: any) {
    this.password = event.target.value
  }

  login() {

    if (this.username && this.password) {
      this.userService.register(this.username, this.password).then((result) => {
        console.log(result)
        if (result.Result.statuscode == "404") {
          this.openSnackBar(result.Result.statustext, "undo")

        } else if (result.Result.statuscode == "200") {



          this.openSnackBar("Usuario " + result.data + " creado correctamente", "Close")

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
