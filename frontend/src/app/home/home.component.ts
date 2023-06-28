import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { AlertInterface } from '../interfaces/IAlert';
import { CookieService } from '../services/cookie.service';
import { UserService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, LoginComponent],
  standalone: true,
  template: `
      <div id="home-component-header" *ngIf="this.userService.loginFlag">
        <i id="home-button" class="material-icons w3-xxlarge" (click)="homeButton()">home</i>
        <i id="user-button"class="material-icons w3-xxlarge" (click)="userButton()">person</i>
      </div>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {


  cookie!: string;
  cookieService: CookieService = inject(CookieService);
  userService : UserService = inject(UserService);
  constructor(private router: Router) {
    this.cookie = this.cookieService.get("SESSIONID");

  }








  clickButton(path: string) {
    this.router.navigate([path]);
  }

  userButton() {
    this.clickButton('/profile')
  }
  homeButton() {
    this.clickButton('/homePage')
  }
}
