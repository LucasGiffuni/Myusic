import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatButtonModule } from '@angular/material/button';
import { SongService } from 'src/app/services/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AddToAlbumComponent } from '../add-to-album/add-to-album.component';
import { CookieService } from 'src/app/services/cookie.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EditSongComponent } from '../song/edit-song/edit-song.component';

@Component({
  selector: 'app-song-detail',
  host: {
    class: 'song-detail-component'
  },
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    YouTubePlayerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  template: `
	<script src="https://www.youtube.com/iframe_api"></script>
  <div id="song-detail-body-component">

  <mat-card class="example-card">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image">
    <button mat-mini-fab color="primary" aria-label="Example icon button with a menu icon" (click)="addSongToAlbum()">
          <mat-icon>add</mat-icon>
    </button>
    </div>
    <mat-card-title id="songCardTitle">{{selectedSong.titulo}}</mat-card-title>
    <mat-card-subtitle>{{selectedSong.autor}}</mat-card-subtitle>
    <button mat-mini-fab color="primary" aria-label="Example icon button with a menu icon" (click)="editSong()">
          <mat-icon>edit</mat-icon>
    </button>
  </mat-card-header>

  <img mat-card-image src={{selectedSong.imagen}} >
  <mat-card-content>

  <youtube-player
			[videoId]="videoId"
			[height]="0.1"
			[width]="0.1"
			(ready)="onPlayerReady($event)">
		</youtube-player>

  </mat-card-content>
  <mat-card-actions id="audio-controller">
		<mat-slider discrete color="accent">
			<input matSliderThumb [(ngModel)]="volume" (input)="updateVolume()">
		</mat-slider>

      <button mat-fab matTooltip="Primary" aria-label="play button" (click)="playMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#303030" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>
			</button>
			<button id="boton-del-medio" mat-fab matTooltip="Primary" aria-label="pause button" (click)="pauseMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#303030" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16ZM96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z"/></svg>
			</button>
			<button mat-fab matTooltip="Primary" aria-label="stop button" (click)="stopMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="#303030" d="M392 432H120a40 40 0 0 1-40-40V120a40 40 0 0 1 40-40h272a40 40 0 0 1 40 40v272a40 40 0 0 1-40 40Z"/></svg>
			</button>
  </mat-card-actions>
</mat-card>
  </div>
  `,
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit, OnDestroy {


  selectedSong: ISong = {
    idCancion: 0,
    titulo: "",
    genero: "",
    fechaLanzamiento: new Date("now"),
    linkReferencia: "",
    autor: "",
    vecesReproducidas: 0,
    imagen: "",
    idUsuario: 0
  };

  isFirstTime: boolean = true
  player: any;
  id!: number;
  private sub: any;
  apiLoaded = false;
  splitted: string = "";
  videoId: string = this.splitted;
  volume: number = 50;

  @ViewChild('youtubePlayer') youtubePlayer: any;
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
	this.isFirstTime = true;
    if (!this.apiLoaded) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.cookieService.remove("SELECTEDSONG")
        this.cookieService.set("SELECTEDSONG", String(this.id));
        this.songService.getSongByID(this.id).then((response) => {
          if (response.Result.statuscode === "403") {
            this.openSessionSnackBar("Session expired", "Cerrar")

            this.router.navigate(['/login']);
          } else {
            this.selectedSong = response.data[0]

            this.splitted = this.selectedSong.linkReferencia.split("=")[1]
            this.videoId = this.splitted
          }
        })

      });
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;

    }
  }

  increaseSongReproductions() {
    const songId = this.selectedSong.idCancion;
    const data = {
      songId
    }
    this.songService.increaseReproductions(data);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onPlayerReady(event: any) {
    this.player = event.target;
    this.updateVolume();
  }

  playMusic() {
    if (this.player) {
      this.player.playVideo();
	  if (this.isFirstTime) {
      	this.increaseSongReproductions();
		this.isFirstTime = false;
	  }
    }
  }

  pauseMusic() {
    if (this.player) {
      this.player.pauseVideo();
    }
  }

  stopMusic() {
    if (this.player) {
      this.player.stopVideo();
    }
  }

  updateVolume() {
    this.player.setVolume(this.volume);
  }

  splitLink(link: string) {
    return link.split("=")[1];
  }
  addSongToAlbum() {
    this.openAlbumDialog('0ms', '0ms')
  }
  editSong(){
    this.openEditSong('0ms', '0ms');
  }

  openAlbumDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddToAlbumComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openSessionSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openEditSong(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditSongComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        song: this.selectedSong
      }
    });
  }
}
