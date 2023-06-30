import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from 'src/app/services/services.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-changpasword',
  standalone: true,
  imports: [CommonModule],
  template: `
  
  <div class="container">
  

  <div class="Change Password">
    <div class="form-group">
      <h1>Change User Password:</h1>
      <label for="username">Current Password:</label>
      <input type="text" id="passwordOld" value="{{currentPasswordUser}}" placeholder="Current Password" (focusout)="onFocusOutPassword($event)">
      <label for="username">New Password:</label>
      <input type="text" id="passwordNew" value="{{newPassword}}" placeholder="New Password" (focusout)="onFocusOutPasswordNew($event)">
      <button (click)="changePassword()">Change</button>
      <button (click)="clickButton('/profile')">Back</button>
    </div>
</div>
  
 `,
  styleUrls: ['./changpasword.component.css']
})
export class ChangpaswordComponent {
  currentPassword: string = "";
  currentPasswordUser: string = "";
  newPassword: string ="";
  userId: number=-1;
  username: string = '';

  userService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);
  profileService:UserService=inject(UserService);
  loginService: UserService = inject(UserService)

  constructor(private router: Router) {
    this.userId = parseInt(this.cookieService.get('USERID'), 10);
    this.getUserProfile(); 
  }

  async getUserProfile() {
    const response = await this.userService.getUserProfile(this.userId);
    if (response) {
      this.username = response.username;
      this.currentPassword = response.password;
    }else{

      this.username="";
      this.currentPassword="";
    }
  }


  onFocusOutPassword(event: any) {
    this.currentPasswordUser = event.target.value
  }
  onFocusOutPasswordNew(event: any) {
    this.newPassword = event.target.value
  }

  changePassword(): void {
    if(this.currentPasswordUser!=this.currentPassword){
      const element = document.getElementById("passwordOld");
      if (element) {
        element.style.color = "red";
      }
    }else{
      this.userService.updateUser(this.userId,this.username,this.newPassword);
      const element = document.getElementById("passwordOld");
      if (element) {
        element.style.color = "black";  
      }
      this.newPassword="";
      this.currentPasswordUser="";     
    }
  }
  clickButton(path: string) {
    this.router.navigate([path]);
  }

}
