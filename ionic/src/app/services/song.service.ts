import { Injectable, inject } from '@angular/core';
import { ISong } from '../interfaces/Isong';
import { IResponse } from '../interfaces/IResponse';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {

  url = 'http://localhost:3000'//'https://backend.wonderfulsky-826aeb73.brazilsouth.azurecontainerapps.io';

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
}
