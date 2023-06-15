import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `

    <app-home id="home-component"/>
  `,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, HomeComponent]
})
export class AppComponent {
  title = 'MyMusic';

}
