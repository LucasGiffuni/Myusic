import { Component, ViewChild, ElementRef, inject, AfterViewChecked, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { CookieService } from 'src/app/services/cookie.service';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { IResponse } from 'src/app/interfaces/IResponse';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { ISong } from 'src/app/interfaces/ISong';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CreateSongDialogComponent } from './create-song-dialog/create-song-dialog.component';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SongLatestComponent } from "./song/song-latest/song-latest.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <div class="library-component">
      <div class="button-text">
        <h1 class="library-component-title">Add album</h1>
        <i id="album-button" class="material-icons w3-xxlarge" (click)="addAlbum()">add</i>
      </div>
        <div #listAlbums class="library-component-album-list">
        <app-album class="album-component" *ngFor="let album of this.albumList" [album]="album"></app-album>
      </div>
    </div>
    <div class = "library-component">
    <div class="button-text">
      <h1 class = "library-component-title">Add song</h1>
      <i id="song-button" class="material-icons w3-xxlarge" (click)="addSong()">add</i>
      </div>

      <div class = "library-component-song-list">
        <app-song class = "song-component" *ngFor="let song of this.songList" [song]="song"></app-song>
      </div>
    </div>
    <div class = "library-component-latest">
      <h1 class = "library-component-title">The latest</h1>
      <div #listSongLatest class = "library-component-songLatest-list">
        <app-song-latest class = "songLatest-component" *ngFor="let song of this.songListLastes" [song]="song"></app-song-latest>
      </div>
    </div>
    <div class = "library-component-outstanding">
      <h1 class = "library-component-title">Outstanding</h1>
      <div #listSongOutStanding class = "library-component-songOutStanding-list">
        <app-song-latest class = "songOutStanding-component" *ngFor="let song of this.songListOutStanding" [song]="song"></app-song-latest>
      </div>
    </div>
  `,
  styleUrls: ['./home-page.component.css'],
  imports: [CommonModule, AlbumComponent, SongComponent, MatDialogModule, MatSnackBarModule, SongLatestComponent]

})
export class HomePageComponent implements AfterViewChecked {
  @ViewChild('listAlbums', { static: false }) listAlbums!: ElementRef;
  @ViewChild('listSongLatest', { static: false }) listSongLatest!: ElementRef;
  @ViewChild('listSongOutStanding', { static: false }) listSongOutStanding!: ElementRef;

  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  albumList: IAlbum[] = [];
  songList: ISong[] = [];
  songListLastes: ISong[] = [];
  songListOutStanding: ISong[] = [];

  @Output() save = new EventEmitter<boolean>();

  constructor(private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.getAlbums();
    this.getSongs();
    this.getSongsByDate();
    this.getSongsByReproductions();
  }

  async getAlbums() {
    this.albumList = [];
    await this.albumService.getAlbums(this.cookieService.get("USERID"))
      .then((value: IResponse<IAlbum>) => {
        if (value.Result.statuscode === "403") {
          this.openSessionSnackBar("Session expired", "Cerrar")

          this.router.navigate(['/login']);
        } else {
          value.data.forEach(element => {
            this.albumList.push(element);
          });

        }

      })
      .catch(error => {
        console.error(error);
      })

  }

  async getSongs() {
    this.songList = []
    await this.songService.getSongs()
      .then((value: IResponse<ISong>) => {
        if (value.Result.statuscode === "403") {
          this.openSessionSnackBar("Session expired", "Cerrar")

          this.router.navigate(['/login']);
        } else {
          value.data.forEach(element => {
            this.songList.push(element);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getSongsByDate() {
    this.songListLastes = []

    await this.songService.getSongsByDate()
      .then((value: IResponse<ISong>) => {
        if (value.Result.statuscode === "403") {
          this.openSessionSnackBar("Session expired", "Cerrar")

          this.router.navigate(['/login']);
        } else {
          value.data.forEach(element => {
            this.songListLastes.push(element);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getSongsByReproductions() {
    this.songListOutStanding = []

    await this.songService.getSongsByReproductions()
      .then((value: IResponse<ISong>) => {
        if (value.Result.statuscode === "403") {
          this.openSessionSnackBar("Session expired", "Cerrar")

          this.router.navigate(['/login']);
        } else {
          value.data.forEach(element => {
            this.songListOutStanding.push(element);
          });
        }
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

    const songOutStandingList = this.listSongOutStanding.nativeElement;
    const songOutStanding = songOutStandingList.querySelectorAll('.songOutStanding-component');
    const entireSongOutStanding = songOutStanding.length;

    const containerAlbum = document.querySelector('.library-component-album-list');
    const containerSongLatest = document.querySelector('.library-component-songLatest-list')
    const containerSongOutStanding = document.querySelector('.library-component-songOutStanding-list')

    this.countColumns(containerAlbum, entireAlbums, 50, 2);
    this.countColumns(containerSongLatest, entireSongLatests, 100, 4);
    this.countColumns(containerSongOutStanding, entireSongOutStanding, 100, 4);
    this.countColumns(containerAlbum, entireAlbums, 50, 2);
    this.countColumns(containerSongLatest, entireSongLatests, 100, 4);
  }

  countColumns(container: any, entire: number, capacity: number, columns: number) {
    if (container != null) {
      const numColumns = Math.ceil(entire / columns);
      container.style.gridTemplateColumns = `repeat(${numColumns}, ${capacity}%)`;
    }
  }


  addSong() {
    this.openSongDialog('0ms', '0ms')

  }
  addAlbum() {
    this.openAlbumDialog('0ms', '0ms')

  }

  openSongDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateSongDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        updateSongs: () => {
          this.getSongs()
          this.getSongsByDate()
          this.getSongsByReproductions()
        }
     }
    });

  }

  openAlbumDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(CreateAlbumDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        updateAlbums: () => {
          this.getAlbums()
        }
     }
    });
  }

  openSessionSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }



}











