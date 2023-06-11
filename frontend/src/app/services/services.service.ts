import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Services {

  url = 'http://localhost:3000';


  constructor() { }


  async createUser(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    return (await (await fetch(`${this.url}/user/createUser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json());
  }



  async login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }
    return (await (await fetch(`${this.url}/user/validateUser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json());
  }


}
