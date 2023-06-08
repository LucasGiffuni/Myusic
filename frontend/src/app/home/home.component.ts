import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from "./library/library.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
   <div id="home-component">

      <app-sidebar id="home-component-sidebar"/>

      <app-library id="home-component-library"/>

    <footer id="home-component-footer"> aasdasd </footer>
   </div>
  `,
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, LibraryComponent, SidebarComponent]
})
export class HomeComponent {

}
