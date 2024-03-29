import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/services/cookie.service';
import { IResponse } from '../interfaces/IResponse';
import { IAlbum } from '../interfaces/IAlbum';


@Injectable({
  providedIn: 'root'
})
export class Services {

  url = 'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io';


  cookieService: CookieService = inject(CookieService);


  constructor() {

  }

  async register(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    return (await (await fetch(`${this.url}/login/createUser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json());
  }

  async updateUser(userId: number, username: string, password: string) {
    const body = {
      userId: userId,
      username: username,
      password: password
    }
    return (await (await fetch(`${this.url}/user/updateUser`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json());
  }



  async login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    return (await (await fetch(`${this.url}/login/validateUser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json());
  }

  async getUserProfile(userId: number) {

    const response = await fetch(`${this.url}/user/getUserCredentials/${userId}`, {
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
