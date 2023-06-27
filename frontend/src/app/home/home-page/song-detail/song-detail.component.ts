import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatButtonModule } from '@angular/material/button';
import { SongService } from 'src/app/services/song.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-detail',
  host: {
    class: 'song-detail-component'
  },
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule, MatButtonModule],
  template: `
	<script src="https://www.youtube.com/iframe_api"></script>

	<div id="song-detail-body-component">
    	<h1 id="song-detail-title"> {{selectedSong.titulo}}</h1>
    	<h3> {{selectedSong.autor}}</h3>

    	<div id="song-detail-image-body">
    		<img id="song-detail-image" src={{selectedSong.imagen}}>
    	</div>

		<div id="audio-controller">
			<button mat-fab matTooltip="Primary" aria-label="play button" (click)="playMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#303030" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>
			</button>
			<button id="boton-del-medio" mat-fab matTooltip="Primary" aria-label="pause button" (click)="pauseMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#303030" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16ZM96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z"/></svg>
			</button>
			<button mat-fab matTooltip="Primary" aria-label="stop button" (click)="stopMusic()">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="#303030" d="M392 432H120a40 40 0 0 1-40-40V120a40 40 0 0 1 40-40h272a40 40 0 0 1 40 40v272a40 40 0 0 1-40 40Z"/></svg>
			</button>
		</div>

		<youtube-player
			[videoId]="videoId"
			[height]="0.1"
			[width]="0.1"
			(ready)="onPlayerReady($event)">
		</youtube-player>
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


  player: any;
  id!: number;
  private sub: any;
  apiLoaded = false;
  splitted: string = "";
  videoId: string = this.splitted;

  @ViewChild('youtubePlayer') youtubePlayer: any;
  songService: SongService = inject(SongService);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {



    if (!this.apiLoaded) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number

        this.songService.getSongByID(this.id).then((response) => {
          this.selectedSong = response.data[0]
          console.log(this.selectedSong)

          this.splitted = this.selectedSong.linkReferencia.split("=")[1]
          console.log(this.splitted);
          this.videoId = this.splitted
        })

      });
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;

    }


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onPlayerReady(event: any) {
    this.player = event.target;
  }

  playMusic() {
    if (this.player) {
      this.player.playVideo();
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

  splitLink(link: string) {
    return link.split("=")[1];
  }

}
