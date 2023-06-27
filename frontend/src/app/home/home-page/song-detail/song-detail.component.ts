import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-song-detail',
  host: {
    class: 'song-detail-component'
  },
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule],
  template: `
<script src="https://www.youtube.com/iframe_api"></script>
   <div id="song-detail-body-component">
    <h1 id="song-detail-title"> {{song.titulo}}</h1>
    <h3> {{song.autor}}</h3>

    <div id="song-detail-image-body">
      <!-- <img id="song-detail-image" src={{song.imageCoverLink}}> -->
    </div>

	<youtube-player
		[videoId]="videoId"
		(ready)="onPlayerReady($event)"
		(stateChange)="onPlayerStateChange($event)"
	></youtube-player>


   </div>
  `,
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent {

  song: ISong = {
    idCancion: 0,
    titulo: "Enter Sandman",
    genero: "Metal",
    fechaLanzamiento: new Date("1991-07-21"),
    linkReferencia: "",
    imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Metallica_-_Enter_Sandman_cover.jpg/220px-Metallica_-_Enter_Sandman_cover.jpg",
    autor: "Metallica",
    vecesReproducidas: 0
  }

  videoId = 'CD-E-LDc384';
  player: any;


  apiLoaded = false;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  onPlayerReady(event: any) {
    this.player = event.target;
  }

  onPlayerStateChange(event: any) {
    // Handle player state changes here (e.g., play, pause, etc.)
  }




}
