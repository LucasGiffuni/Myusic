import { Component } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';
import { UserInterface } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
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
