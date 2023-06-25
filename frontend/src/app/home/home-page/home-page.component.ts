import { Component, ViewChild, ElementRef, inject, AfterViewChecked} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { Services } from 'src/app/services/services.service';
import { CookieService } from 'src/app/services/cookie.service';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { IResponse } from 'src/app/interfaces/IResponse';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, AlbumComponent, SongComponent],
  template: `
    <div class="library-component">
      <h1 class="library-component-title">Add album</h1>
      <div #listAlbums class="library-component-album-list">
        <app-album class="album-component" *ngFor="let album of this.albumList" [albums]="album"></app-album>
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
export class HomePageComponent implements AfterViewChecked {
  @ViewChild('listAlbums', {static:false}) listAlbums! : ElementRef;

  albumService: Services = inject(Services);
  cookieService: CookieService = inject(CookieService);

  albumList : IAlbum[] = [];

  constructor(){
    this.albumService.getAlbums(this.cookieService.get("USERID"))
    .then((value:IResponse<IAlbum>) => {
      value.data.forEach(element => {
        this.albumList.push(element);
      });
    })
    .catch(error => {
      console.error(error);
    })
  }

  ngAfterViewChecked() {
    const albumList = this.listAlbums.nativeElement;
    const albums = albumList.querySelectorAll('.album-component');
    const totalAlbums = albums.length;
    console.log(totalAlbums);

    const containerAlbum = document.querySelector('.library-component-album-list');
    if (containerAlbum != null) {
      const numColumns = Math.ceil(totalAlbums / 2);
      //@ts-ignore
      containerAlbum.style.gridTemplateColumns = `repeat(${numColumns}, 50%)`;
    }
  }
}
