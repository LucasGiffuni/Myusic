import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from "./library/library.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "../login/login.component";
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { AlertComponent } from "../alert/alert.component";
import { AlertInterface } from '../interfaces/IAlert';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, LoginComponent, AlertComponent],
  standalone: true,
  template: `
   <div id="home-component">
      <app-login id="login-component"/>
   </div>
  `,
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, LibraryComponent, SidebarComponent, LoginComponent]
    <div id="login-component">
        <router-outlet ></router-outlet>

    </div>

      <app-alert  [alert]="alert" />
   </div>
  `,
  styleUrls: ['./home.component.css']
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

    console.log(this.alert)
  }

  myFunction() {
    this.alerts.pop()
    console.log(this.alert.id);
  }


}
