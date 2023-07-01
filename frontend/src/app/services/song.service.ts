import { Injectable, inject } from '@angular/core';
import { ISong } from '../interfaces/ISong';
import { CookieService } from './cookie.service';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  url = 'http://localhost:3000';

  constructor(private cookieService: CookieService) { }

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

  async getSongs(): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/getSongs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];

  }

  async getSongsByDate(): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/getSongsByDate`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }


  async createSong(idUser: number, body: ISong): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/createSong/${idUser}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }

  async getSongByID(idSong: number): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/getSongByID/${idSong}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
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
  async getSongBySearchValue(body: { searchValue: string }): Promise<IResponse<ISong>> {
    return (await (await fetch(`${this.url}/song/getSongsBySearchValue/${body.searchValue}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get("SESSIONID"),
        'Content-Type': 'application/json',
      }
    })).json()) ?? [];
  }
}
