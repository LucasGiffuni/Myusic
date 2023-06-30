import { Injectable, inject } from '@angular/core';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';
import { IAlbum } from '../interfaces/IAlbum';
import { ISong } from '../interfaces/ISong';

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
  async getAlbumsDetails(idAlbum: number): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/getAlbumsDetails/${idAlbum}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }
  async getUserAlbums(idUser: number): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/getUserAlbums/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }
  async getAlbumsSongs(idUser: number): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/albums/getAlbumsSongs/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }


  async createAlbum(idUser: number, body: IAlbum): Promise<IResponse<IAlbum>> {
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
  async addSongToAlbum(body: { songID: number, albumID: number }): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/addSongToAlbum`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }
  async removeSongFromAlbum(body: { songID: number, albumID: number }): Promise<IResponse<IAlbum>> {
    return (await (await fetch(`${this.url}/albums/removeSongFromAlbum`, {
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
