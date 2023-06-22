import { Component, AfterViewInit, ViewChild, ElementRef, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { Album } from 'src/app/interfaces/album';
import { Services } from 'src/app/services/services.service';
import { UserInterface } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, AlbumComponent, SongComponent],
  template: `
    <div class="library-component">
      <h1 class="library-component-title">Add album</h1>
      <div #listAlbums class="library-component-album-list">
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
        <app-album class="album-component"></app-album>
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
    <div class = "library-component-latest">
      <h1 class = "library-component-title">The latest</h1>
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
export class HomePageComponent implements AfterViewInit {
  @ViewChild('listAlbums', {static:false}) listAlbums! : ElementRef;
  
  albumService: Services = inject(Services);
  albumList! : any;

  constructor(){
    this.albumList = this.albumService.getAlbums(this.albumService.userId);
    console.log(this.albumList);
  }
  
  ngAfterViewInit(){
    const albumList = this.listAlbums.nativeElement;
    const albums = albumList.querySelectorAll('.album-component');
    const totalAlbums = albums.length;

    const containerAlbum = document.querySelector('.library-component-album-list');
    if (containerAlbum != null){
      const numColumns = Math.ceil(totalAlbums / 2);
      //@ts-ignore
      containerAlbum.style.gridTemplateColumns = `repeat(${numColumns}, 50%)`;
    }
  }
}


