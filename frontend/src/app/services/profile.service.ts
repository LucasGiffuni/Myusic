import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../interfaces/IUser';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private cookieService: CookieService) { }
  
  async getUssernameBiId(idUser: number): Promise<IResponse<UserInterface>>{
    
  }



  /*
  private currentUser: UserInterface = {
    id:0,
    username: '',
    password: '',
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
  */
}