import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { SongService } from '../services/song.service';
import { Song } from '../interfaces/song';
import { SongComponent } from './song/song.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  standalone: true,
  imports: [IonicModule, SongComponent, CommonModule],
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent  implements OnInit {

	private data = inject(SongService);

	constructor() {}

	ngOnInit() {
	}

	refresh(ev: any) {
	  setTimeout(() => {
		(ev as RefresherCustomEvent).detail.complete();
	  }, 3000);
	}

	getSongs(): Song[] {
	  return this.data.getSongs();
	}
}
