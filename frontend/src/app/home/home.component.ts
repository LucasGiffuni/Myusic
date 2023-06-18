import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';

import { AlertComponent } from '../alert/alert.component';
import { AlertInterface } from '../interfaces/IAlert';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, LoginComponent, AlertComponent],
  standalone: true,
  template: `
    <div id="home-component">
      <div id="home-component-header">
     <i id="home-button" class="material-icons w3-xxlarge">home</i>
     <i id="user-button"class="material-icons w3-xxlarge">person</i>
      </div>
      <router-outlet></router-outlet>
      <app-alert *ngFor="let alert of alerts" [alert]="alert"></app-alert>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  alerts: AlertInterface[];

  alert = {} as AlertInterface;

  constructor() {
    this.alerts = [] as AlertInterface[];
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
}
