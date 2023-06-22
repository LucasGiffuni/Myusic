import { Injectable } from '@angular/core';
import { ISong } from '../interfaces/ISong';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  url = 'http://localhost:3000';
  actualToken = "";

  constructor() { }


  async updateUser(body: ISong) {

    return (await (await fetch(`${this.url}/song/editSong`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.actualToken,
        'Content-Type': 'application/json',
      }
    })).json());
  }
}
