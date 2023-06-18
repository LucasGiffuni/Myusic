import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, AlbumComponent, SongComponent],
  template: `
    <div class="library-component">
      <h1 class="library-component-title">Add album</h1>
      <div class="library-component-album-list">
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
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
    <div class = "library-component">
      <h1 clas = "library-component-title">The latest</h1>
      <div class = library-component-songLatest-list>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
        <app-song class = "songLatest-component"></app-song>
      </div>
    </div>
  `,
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {}
