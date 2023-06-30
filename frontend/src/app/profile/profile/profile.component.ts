import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { Services } from '../../services/services.service';


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
          <button (click)="clickButton('/changeUserName')">Change</button>
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
  currentUser: UserInterface | undefined;
  username: string = '';
  password: string = '';
  cookieService: CookieService = inject(CookieService);
  userService: Services = inject(Services);
  profileService:UserService=inject(UserService)
  userId: number=-1;
  loginService: UserService = inject(UserService);

  constructor(private router: Router) {
    this.userId = parseInt(this.cookieService.get('USERID'), 10);
    this.getUserProfile();  
  }

  async getUserProfile() {
    const response = await this.userService.getUserProfile(this.userId);
    //const response = await this.profileService.getUserCredentials(this.userId);
    if (response) {

      this.username = response.username;
      this.password = response.password;
    }else{

      this.username="Not found";
      this.password="Not found";
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
