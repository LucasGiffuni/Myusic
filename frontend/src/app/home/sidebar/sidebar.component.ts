import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
    <header id="sidebar-component-header">Tu Biblioteca</header>
      <ul>
        <li>
          a
        </li>
        <li>
          a
        </li>
        <li>
          a
        </li>
        <li>
          a
        </li>
      </ul>

   </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

}
