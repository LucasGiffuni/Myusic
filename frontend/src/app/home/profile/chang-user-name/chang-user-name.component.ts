import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chang-user-name',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: `

  <div class="container">

  <div class="Change Username">
    <div class="form-group">
      <h1>Change User Name:</h1>
      <label for="username">Current Name:</label>
      <input type="text" id="NameOld" value="{{currentName}}" placeholder="Name Not Found" disabled>
      <label for="username">New Name:</label>
      <input type="text" id="NameNew" value="" placeholder="New Name" (focusout)="onFocusOutNameNew($event)">
      <button (click)="changeName()">Change</button>
      <button (click)="clickButton('/profile')">Back</button>

    </div>
</div>

 `,
  styleUrls: ['./chang-user-name.component.css']
})
export class ChangUserNameComponent {

  currentName: string = "tom";
  newName: string = "";
  userId: number = -1;
  password: string = "";
  userService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);
  profileService: UserService = inject(UserService)
  loginService: UserService = inject(UserService);

  constructor(private router: Router, private _snackBar: MatSnackBar) {
    this.userId = parseInt(this.cookieService.get('USERID'), 10);
    this.getUserProfile();

  }

  async getUserProfile() {
    const response = await this.userService.getUserProfile(this.userId);
    if (response) {
      this.currentName = response.username;
      this.password = response.password;
    } else {
      this.currentName = "Not found";
      this.password = "Not found";
    }
  }

  onFocusOutNameNew(event: any) {
    this.newName = event.target.value
  }

  changeName(): void {
    this.userService.updateUser(this.userId, this.newName, this.password).then((result) => {
      if (result.Result.statusCode === "403") {
        this.openSessionSnackBar("Session expired", "Cerrar")
        this.router.navigate(['/login']);
      } else {
        this.newName = "";
        this.getUserProfile();
        this.openSessionSnackBar("Username successfully changed", "Cerrar")

      }
    });

  }

  clickButton(path: string) {
    this.router.navigate([path]);
  }

  openSessionSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}



