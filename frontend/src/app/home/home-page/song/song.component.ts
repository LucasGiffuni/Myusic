import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class = "song-component">
      <img class="image-song" src={{this.song.imagen}}>
      <h2 class = "song-title">{{this.song.titulo}}</h2>
      <h2 class = "author-band">{{this.song.autor}}</h2>
    </div>
  `,
  styleUrls: ['./song.component.css']
})
export class SongComponent  {
  @Input() song! : ISong;

  constructor(){
    // console.log(`Song ${this.song}`);
  }
}
