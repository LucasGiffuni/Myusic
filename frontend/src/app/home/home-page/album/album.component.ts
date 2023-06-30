import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
   <a id="routing" [routerLink]="['/albumsongs', this.album.idAlbum]" >
  <div id="album-component">
    <img id="album-component-cover" src="https://iili.io/HlHy9Yx.png">
    <h2 class="album-component-title">{{this.album.titulo}}</h2>
  </div>
</a>
  `,
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  @Input() album! : IAlbum

  constructor(){

  }
}
