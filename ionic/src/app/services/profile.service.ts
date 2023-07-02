import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../interfaces/IUser';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io'//'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io';
  cookieService: CookieService = inject(CookieService);
  loginFlag: boolean = false;


  constructor() { }

  async getUsernameById(userId:number){
    const body={
      userId:userId
    }
    console.log(userId)
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

  async getUserCredentials(userId:number){
    console.log("enterProfileServis");
    const response = await fetch(`${this.url}/getUserCredentials/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    });
    return response.json();

  }





}
