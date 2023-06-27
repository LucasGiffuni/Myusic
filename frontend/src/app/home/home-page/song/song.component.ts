import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a id="routing" [routerLink]="['/songDetail', this.song.idCancion]" >
    	<div class = "song-component">
    		<img class="image-song" src={{this.song.imagen}}>
    		<h2 class = "song-title">{{this.song.titulo}}</h2>
    		<h2 class = "author-band">{{this.song.autor}}</h2>
    	</div>
	</a>
  `,
  styleUrls: ['./song.component.css']
})
export class SongComponent  {
  @Input() song! : ISong;

  constructor(){
    // console.log(`Song ${this.song}`);
  }
}
