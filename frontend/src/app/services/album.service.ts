import { Injectable, inject } from '@angular/core';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';
import { IAlbum } from '../interfaces/IAlbum';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url = 'http://localhost:3000';
  cookieService: CookieService = inject(CookieService);

  constructor() { }

  async getAlbums(idUser: number): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/getAlbums/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }


  async createAlbum(idUser: number,body: IAlbum): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/createAlbum/${idUser}`, {
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
