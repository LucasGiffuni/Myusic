import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  public songs: Song[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false,
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false,
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false,
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false,
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false,
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false,
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false,
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false,
    },
  ];

  constructor() {}

  public getSongs(): Song[] {
    return this.songs;
  }

  public getSongById(id: number): Song {
    return this.songs[id];
  }

}
