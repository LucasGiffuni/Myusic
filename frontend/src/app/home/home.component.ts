import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { AlertComponent } from '../alert/alert.component';
import { AlertInterface } from '../interfaces/IAlert';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, LoginComponent, AlertComponent],
  standalone: true,
  template: `
      <div id="home-component-header" *ngIf="this.loginFlag">
        <i id="home-button" class="material-icons w3-xxlarge" (click)="homeButton()">home</i>
        <i id="user-button"class="material-icons w3-xxlarge" (click)="userButton()">person</i>
      </div>
      <router-outlet></router-outlet>
      <app-alert *ngFor="let alert of alerts" [alert]="alert"></app-alert>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  alerts: AlertInterface[];
  alert = {} as AlertInterface;

  cookie!: string;
  cookieService: CookieService = inject(CookieService);
  loginFlag: boolean = false

  constructor(private router: Router) {
    this.alerts = [] as AlertInterface[];
    this.cookie = this.cookieService.get("SESSIONID");
    this.loginFlag = false;

  }

  ngOnInit() {
  }

  addAlert(alert: AlertInterface) {
    this.alerts.push(alert);
    this.alert = alert;

    console.log(this.alert);
  }



  myFunction() {
    this.alerts.pop();
    console.log(this.alert.id);
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
