import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services.service';
import { HomeComponent } from '../home.component';
import { AlertInterface } from '../../interfaces/IAlert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  host: {
    class: 'login-component'
  },
  standalone: true,
  imports: [CommonModule],
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

  constructor(private viewContainerRef: ViewContainerRef, private router: Router) {
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


        this.userService.actualToken = response.user.token;
        this.userService.userId = response.user.idUsuario;

        if (response.resultado.statusCode == "404") {
          this.alert.id = 0;
          this.alert.text = response.resultado.statusText;
          this.alert.type = "success";
          this.alert.style = '#af233a';


          this._parent.addAlert(this.alert);
        } else if (response.resultado.statusCode == "200") {
          this.alert.id = 0;
          this.alert.text = "Bienvenido " + response.user.username;
          this.alert.type = "success";
          this.alert.style = '#0d6832';

          this.clickButton('/songDetail')

          this._parent.addAlert(this.alert);
        }
      });
    } else {
      this.alert.id = 0;
      this.alert.text = "Username and password cannot be null";
      this.alert.type = "error";
      this.alert.style = '#af233a';

      this._parent.addAlert(this.alert);
    }

  }


}
