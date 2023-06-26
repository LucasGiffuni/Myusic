import { Component, ViewChild, ElementRef, inject, AfterViewChecked} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { CookieService } from 'src/app/services/cookie.service';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { IResponse } from 'src/app/interfaces/IResponse';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { ISong } from 'src/app/interfaces/ISong';
import { SongLatestComponent } from "./song/song-latest/song-latest.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    template: `
    <div class="library-component">
      <h1 class="library-component-title">Add album</h1>
      <div #listAlbums class="library-component-album-list">
        <app-album class="album-component" *ngFor="let album of this.albumList" [album]="album"></app-album>
      </div>
    </div>
    <div class = "library-component">
      <h1 class = "library-component-title">Add song</h1>
      <div class = "library-component-song-list">
        <app-song class = "song-component" *ngFor="let song of this.songList" [song]="song"></app-song>
      </div>
    </div>
    <div class = "library-component-latest">
      <h1 class = "library-component-title">The latest</h1>
      <div #listSongLatest class = "library-component-songLatest-list">
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
        <app-song-latest class = "songLatest-component"></app-song-latest>
      </div>
    </div>
  `,
    styleUrls: ['./home-page.component.css'],
    imports: [CommonModule, AlbumComponent, SongComponent, SongLatestComponent]
})
export class HomePageComponent implements AfterViewChecked {
  @ViewChild('listAlbums', {static:false}) listAlbums! : ElementRef;
  @ViewChild('listSongLatest', {static:false}) listSongLatest! : ElementRef;

  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  albumList : IAlbum[] = [];
  songList : ISong[] = []

  constructor(){
    this.getAlbums();
    this.getSongs();
    this.getSongsByDate();
  }

  async getAlbums(){
    await this.albumService.getAlbums(this.cookieService.get("USERID"))
    .then((value:IResponse<IAlbum>) => {
      value.data.forEach(element => {
        this.albumList.push(element);
      });
    })
    .catch(error => {
      console.error(error);
    })
    
  }

  async getSongs(){
    await this.songService.getSongs()
    .then((value:IResponse<ISong>) =>{
      value.data.forEach(element => {
        this.songList.push(element);
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  async getSongsByDate(){
    await this.songService.getSongsByDate()
    .then((value:IResponse<ISong>) =>{
      value.data.forEach(element => {
        this.songList.push(element);
        console.log('titulo: ' + element.titulo)
      });
      console.log(this.songList);
    })
    .catch(err => {
      console.error(err);
    });
  }
  

  ngAfterViewChecked() {
    const albumList = this.listAlbums.nativeElement;
    const albums = albumList.querySelectorAll('.album-component');
    const entireAlbums = albums.length;
    
    const songLatestList = this.listSongLatest.nativeElement;
    const songsLatests = songLatestList.querySelectorAll('.songLatest-component');
    const entireSongLatests = songsLatests.length;

    const containerAlbum = document.querySelector('.library-component-album-list');
    const containerSongLatest = document.querySelector('.library-component-songLatest-list')

    this.countColumns(containerAlbum,entireAlbums,50,2);
    this.countColumns(containerSongLatest, entireSongLatests,100,4);
  }

  countColumns(container : any, entire : number, capacity:number, columns:number ){
    if (container != null) {
      const numColumns = Math.ceil(entire / columns);
      container.style.gridTemplateColumns = `repeat(${numColumns}, ${capacity}%)`;
    }
  }
}
