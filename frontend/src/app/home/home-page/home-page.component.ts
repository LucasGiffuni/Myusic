import { Component, ViewChild, ElementRef, inject, AfterViewChecked } from '@angular/core';
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
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { CreateSongDialogComponent } from './create-song-dialog/create-song-dialog.component';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <div class="library-component">
      <div class="button-text">
        <h1 class="library-component-title">Add album</h1>
        <i id="album-button" class="material-icons w3-xxlarge" (click)="addSong()">add</i>
      </div>
        <div #listAlbums class="library-component-album-list">
        <app-album class="album-component" *ngFor="let album of this.albumList" [album]="album"></app-album>
      </div>
    </div>
    <div class = "library-component">
    <div class="button-text">
      <h1 class = "library-component-title">Add song</h1>
      <i id="song-button" class="material-icons w3-xxlarge" (click)="addAlbum()">add</i>
      </div>

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
  imports: [CommonModule, AlbumComponent, SongComponent, SongLatestComponent, MatDialogModule]

})
export class HomePageComponent implements AfterViewChecked {
  @ViewChild('listAlbums', { static: false }) listAlbums!: ElementRef;
  @ViewChild('listSongLatest', { static: false }) listSongLatest!: ElementRef;

  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  albumList: IAlbum[] = [];
  songList: ISong[] = []


  constructor(private router: Router, public dialog: MatDialog) {
    this.getAlbums();
    this.getSongs();
    this.getSongsByDate();
  }

  async getAlbums() {
    await this.albumService.getAlbums(this.cookieService.get("USERID"))
      .then((value: IResponse<IAlbum>) => {
        value.data.forEach(element => {
          this.albumList.push(element);
        });

        console.log(value.Result)
        if (value.Result.statuscode === "403") {
          this.router.navigate(['/login']);
        }


      })
      .catch(error => {
        console.error(error);
      })

  }

  async getSongs() {
    await this.songService.getSongs()
      .then((value: IResponse<ISong>) => {
        value.data.forEach(element => {
          this.songList.push(element);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getSongsByDate() {
    await this.songService.getSongsByDate()
      .then((value: IResponse<ISong>) => {
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

    this.countColumns(containerAlbum, entireAlbums, 50, 2);
    this.countColumns(containerSongLatest, entireSongLatests, 100, 4);
  }

  countColumns(container: any, entire: number, capacity: number, columns: number) {
    if (container != null) {
      const numColumns = Math.ceil(entire / columns);
      container.style.gridTemplateColumns = `repeat(${numColumns}, ${capacity}%)`;
    }
  }


  addAlbum() {
    this.openSongDialog('0ms', '0ms')
  }
  addSong() {
    this.openAlbumDialog('0ms', '0ms')

  }

  openSongDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateSongDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openAlbumDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateAlbumDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}











