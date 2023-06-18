import { Component } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-profile',
  
  template: `
  
  <div class="container">
  

  <div class="profile">
    <div class="form-group">
      <h1>User Profile:</h1>
      <label for="username">Username:</label>
      <input type="text" id="username" value="{{currentUser.username}}" disabled>
      <button (click)="changeUsername()" >Change</button>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" value="{{currentUser.password}}" disabled>
      <button (click)="changePassword()">Change</button>
    </div>
  </div>
</div>
  
 `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: UserInterface;
  

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getUser();
  }

  changeUsername(): void {
    const newUsername = prompt('Enter a new username:');
    if (newUsername) {
      this.userService.changeUsername(newUsername);
      this.currentUser = this.userService.getUser(); 
    }
  }

  changePassword(): void {
    const newPassword = prompt('Enter a new password:');
    if (newPassword) {
      this.userService.changePassword(newPassword);
      this.currentUser = this.userService.getUser(); 
    }
  }
}
