import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, AlbumComponent, SongComponent],
  template: `
    <div id="library-component">
      <h1 class="library-component-title">Add album</h1>
      <div id="library-component-album-list">
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
        <app-album id="album-component"></app-album>
      </div>
    </div>
    <div class = "library-component">
      <h1 class = "library-component-title">Add song</h1>
      <div class = "library-component-song-list">
        <app-song class = "song-component"></app-song>
        <app-song class = "song-component"></app-song>
        <app-song class = "song-component"></app-song>
        <app-song class = "song-component"></app-song>


      </div>
    </div>
  `,
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {}
