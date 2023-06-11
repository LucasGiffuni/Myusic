import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from "./library/library.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
   <div id="home-component">
      <app-login id="login-component"/>
   </div>
  `,
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, LibraryComponent, SidebarComponent, LoginComponent]
})
export class HomeComponent {

}
