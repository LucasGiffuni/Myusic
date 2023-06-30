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
      <input type="text" id="passwordOld" value="" placeholder="Current Password" (focusout)="onFocusOutPassword($event)">
      <label for="username">New Password:</label>
      <input type="text" id="passwordNew" value="" placeholder="New Password" (focusout)="onFocusOutPasswordNew($event)">
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
  profileService:UserService=inject(UserService)


  constructor(private router: Router) {
    this.userId=this.cookieService.get("USERID");
    if(this.userId>=0){
      this.username=String(this.profileService.getUsernameById(this.userId));
      this.currentPassword=String(this.profileService.getPasswordById(this.userId));
    }else{
      this.currentPassword="Not Value";
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
      this.currentPassword=this.newPassword;
      this.currentPasswordUser=this.newPassword;
      this.userService.updateUser(this.userId,this.username,this.newPassword);
      const element = document.getElementById("passwordOld");
      if (element) {
        element.style.color = "black";
      }
    }
  }
  clickButton(path: string) {
    this.router.navigate([path]);
  }

}
