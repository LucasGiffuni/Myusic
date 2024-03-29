import { Injectable, inject } from '@angular/core';
import { ISong } from '../interfaces/Isong';
import { IResponse } from '../interfaces/IResponse';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {

  url = 'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io'//'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io';

  cookieService: CookieService = inject(CookieService);

  constructor() {}

  async getSongs(): Promise<IResponse<ISong>> {
    return (
      (await (
        await fetch(`${this.url}/song/getSongs`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.cookieService.get('SESSIONID'),
            'Content-Type': 'application/json',
          },
        })
      ).json()) ?? []
    );
  }

  async getSongByID(idSong: number): Promise<IResponse<ISong>> {
    return (
      (await (
        await fetch(`${this.url}/song/getSongByID/${idSong}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.cookieService.get('SESSIONID'),
            'Content-Type': 'application/json',
          },
        })
      ).json()) ?? []
    );
  }

  async getSongsByReproductions() : Promise<IResponse<ISong>>{
    return (await (await fetch(`${this.url}/song/getSongReproductions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }

  async increaseReproductions(body: { songId: number }): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/increaseSongReproductions`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }


}
