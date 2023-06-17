import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';

@Component({
  selector: 'app-song-detail',
  host: {
    class: 'song-detail-component'
  },
  standalone: true,
  imports: [CommonModule],
  template: `

   <div id="song-detail-body-component">
    <h1 id="song-detail-title"> {{song.title}}</h1>
    <h3> {{song.autor}}</h3>
    
    <div id="song-detail-image-body">
      <img id="song-detail-image" src={{song.imageCoverLink}}>
    </div>
   </div>
  `,
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent {

  song: ISong = {
    id: 0,
    title: "Enter Sandman",
    genre: "Metal",
    releaseDate: new Date("1991-07-21"),
    sourceLink: "",
    imageCoverLink: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Metallica_-_Enter_Sandman_cover.jpg/220px-Metallica_-_Enter_Sandman_cover.jpg",
    autor: "Metallica",
    vecesReproducidas: 0
  }

}