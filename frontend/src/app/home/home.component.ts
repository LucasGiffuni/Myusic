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
      <i
        id="home-button"
        class="material-icons w3-xxlarge"
        (click)="homeButton()"
        >home</i
      >

        <form class="searchSongForm" (keydown.enter)="$event.preventDefault()">
          <input
            id="searchSongInput"
            type="text"
            placeholder="Search song by name"
            (input)="onFocusOutPassword($event)"
          />
          <i
            id="searchButton"
            class="material-icons w3-xxxmedium"
            (click)="searchSong()"
            >search</i
          >
        </form>
     
      <i
        id="user-button"
        class="material-icons w3-xxlarge"
        (click)="userButton()"
        >person</i
      >
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cookie!: string;
  cookieService: CookieService = inject(CookieService);
  userService: UserService = inject(UserService);

  searchValue!: string;

  constructor(private router: Router) {
    this.cookie = this.cookieService.get('SESSIONID');
  }

  clickButton(path: string) {
    this.router.navigate([path]);
  }

  userButton() {
    this.clickButton('/profile');
  }
  homeButton() {
    this.clickButton('/homePage');
  }

  onFocusOutPassword(event: any) {
    this.searchValue = event.target.value;
  }

  searchSong() {
    this.clickButton(`searchSong/${this.searchValue}`);
    this.cookieService.remove('SEARCHVALUE');
    this.cookieService.set("SEARCHVALUE", String(this.searchValue));

  }
}
