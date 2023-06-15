import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: UserInterface = {
    username: '',
    password: ''
  };

  getUser(): UserInterface {
    return this.currentUser;
  }

  changeUsername(newUsername: string): void {
    this.currentUser.username = newUsername;
  }

  changePassword(newPassword: string): void {
    this.currentUser.password = newPassword;
  }
}