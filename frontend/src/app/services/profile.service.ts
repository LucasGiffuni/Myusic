import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../interfaces/IUser';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';
  cookieService: CookieService = inject(CookieService);

  constructor() { }

  async getUsernameById(userId:number){
    const body={
      userId:userId
    }
    return(await(await fetch(`${this.url}/getUsernameById/:idUsuario`, {
      method: 'GET',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json)
  
  }

  async getPasswordById(userId:number){
    const body={
      userId:userId
    }
    return(await(await fetch(`${this.url}/getPasswordById/:idUsuario`, {
      method: 'GET',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json)
  
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