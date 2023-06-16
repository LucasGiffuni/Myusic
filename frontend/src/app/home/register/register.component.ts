import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services.service';
import { HomeComponent } from '../home.component';
import { AlertInterface } from '../../interfaces/IAlert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
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
      this.userService.register(this.username, this.password).then((response) => {
        console.log(response)

        if (response.resultado.statusCode == "404") {
          this.alert.id = 0;
          this.alert.text = response.resultado.statusText;
          this.alert.type = "success";
          this.alert.style = '#af233a';


          this._parent.addAlert(this.alert);
        } else if (response.resultado.statusCode == "200") {
          this.alert.id = 0;
          this.alert.text = "Usuario " + response.user.username + " creado correctamente";
          this.alert.type = "success";
          this.alert.style = '#0d6832';



          this._parent.addAlert(this.alert);
          this.clickButton('/login')

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
