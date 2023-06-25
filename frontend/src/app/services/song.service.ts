import { Injectable, inject } from '@angular/core';
import { ISong } from '../interfaces/ISong';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  url = 'http://localhost:3000';

  constructor(private cookieService: CookieService) {}

  async updateUser(body: ISong) {
    return (await (await fetch(`${this.url}/song/editSong`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }

  async getSongs() : Promise<IResponse<ISong>>{
    return (await(await fetch(`${this.url}/song/getSongs`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];

  }

}
