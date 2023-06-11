import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from '../services/services.service';

@Component({
  selector: 'app-login',
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
        <input type="Button" id="login-component-formButton" value="Login" (click)="login()" >
      </div>


      <div id="login-component-signUpBody">
        <p> Not a User? <a href="">Sign Up</a> </p>
      </div>
    </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";


  userService: Services = inject(Services);


  onFocusOutUsername(event: any) {
    this.username = event.target.value
  }
  onFocusOutPassword(event: any) {
    this.password = event.target.value
  }

  login() {
    this.userService.login(this.username, this.password);
  }
}
