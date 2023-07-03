import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-song-latest',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
  <a class="routing" [routerLink]="['/songDetail', this.song.idCancion]" >
    <div class = "song-latest-component">
        <img class = "image-song" src={{this.song.imagen}}>
        <div class ="song-info">
          <h2 class = "song-title">{{this.song.titulo}}</h2>
          <h2 class = "author-band">{{this.song.autor}}</h2>
        <div>
    </div>
  `,
  styleUrls: ['./song-latest.component.css']
})
export class SongLatestComponent {
  @Input() song! : ISong;
}
