import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { LibraryComponent } from "./library/library.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./login/login.component";
import { AlertComponent } from "../alert/alert.component";
import { AlertInterface } from '../interfaces/IAlert';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
   <div id="home-component">
      <router-outlet></router-outlet>

      <app-alert  [alert]="alert" />
   </div>
  `,
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterOutlet, LibraryComponent, SidebarComponent, LoginComponent, AlertComponent]
})
export class HomeComponent {

  alerts: AlertInterface[];

  alert = {} as AlertInterface;

  constructor() {
    this.alerts = [] as AlertInterface[];
    setInterval(this.myFunction, 5000);

  }



  addAlert(alert: AlertInterface) {
    this.alerts.push(alert);
    this.alert = alert;

    console.log(this.alert)
  }

  myFunction() {

    console.log(this.alert.id);
  }


}
