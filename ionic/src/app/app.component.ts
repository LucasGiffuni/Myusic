import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from "./login/login.component";
import { CookieService } from './services/cookie.service';
import { UserService } from './services/profile.service';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, LoginComponent]
})
export class AppComponent {

  loginFlag: boolean = false

  public appPages = [
    /*{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },*/
	{ title: 'songs', url: '/songList', icon: 'songs' },
	{ title: 'Music Player', url: '/musicPlayer', icon: 'play-circle-outline' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
}
