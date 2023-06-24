import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from 'src/app/services/services.service';
import { Router } from '@angular/router';

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
  currentPassword: string = "password";
  currentPasswordUser: string = "";
  newPassword: string ="";
  userService: Services = inject(Services);
  tempUserId: number=25;
  tempUsername: string="tempName";

  constructor(private router: Router) {
    //get the current password
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
      this.userService.updateUser(this.tempUserId,this.tempUsername,this.newPassword);
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
