import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HTTPInterceptor } from './services/HTTPInterceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <app-home id="home-component"/>
  `,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, HomeComponent, HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },]
})
export class AppComponent {
  title = 'MyMusic';

}
