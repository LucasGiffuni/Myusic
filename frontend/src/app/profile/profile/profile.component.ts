import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';
import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="container">
      <div class="profile">
        <div class="form-group">
          <h1>User Profile:</h1>
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            value="{{ username }}"
            placeholder="Username"
            disabled
          />
          <button (click)="clickButton('/changeUsserName')">Change</button>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            value="{{ password }}"
            placeholder="Password"
            disabled
          />
          <button (click)="clickButton('/changePassword')">Change</button>
        </div>

        <button
          mat-flat-button
          color="primary"
          mat-dialog-close
          cdkFocusInitial
          (click)="logout()"
        >
          Logout
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentUser: UserInterface;
  username: string = '';
  password: string = '';
  cookieService: CookieService = inject(CookieService);
  loginService: UserService = inject(UserService);


  onFocusOutUsername(event: any) {
    this.username = event.target.value;
  }
  onFocusOutPassword(event: any) {
    this.password = event.target.value;
  }

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.getUser();
  }

  changeUsername(): void {
    const newUsername = prompt('Enter a new username:');
    if (newUsername) {
      this.userService.changeUsername(newUsername);
      this.currentUser = this.userService.getUser();
    }
  }
  clickButton(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.router.navigate(["login"]);
    this.cookieService.remove("SESSIONID")
    this.cookieService.remove("USERID")
    this.cookieService.remove("SELECTEDSONG")
    this.loginService.loginFlag = false;
  }
}
