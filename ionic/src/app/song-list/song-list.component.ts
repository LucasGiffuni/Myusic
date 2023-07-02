import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { SongService } from '../services/song.service';
import { ISong } from '../interfaces/Isong';
import { SongComponent } from './song/song.component';
import { CommonModule } from '@angular/common';
import { IResponse } from '../interfaces/IResponse';
import { CookieService } from '../services/cookie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  standalone: true,
  imports: [IonicModule, SongComponent, CommonModule, RouterModule],
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

	songList: ISong[] = [];
	private data = inject(SongService);
	songService: SongService = inject(SongService);
	cookieService: CookieService = inject(CookieService);
	alertController: any;

	constructor() {}

	async ngOnInit() {
		await this.getSongs();
	}

	refresh(ev: any) {
	  setTimeout(() => {
		(ev as RefresherCustomEvent).detail.complete();
	  }, 3000);
	}

	async getSongs() {
		await this.songService.getSongs()
		  .then((value: IResponse<ISong>) => {
			if (value.Result.statuscode === "403") {
			  this.openSnackBar("Session expired", "Cerrar")

			  	const router = document.querySelector('ion-router');
				const routeRedirect = document.createElement('ion-route-redirect');
				routeRedirect.setAttribute('from', '*');
				routeRedirect.setAttribute('to', '/login');

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
	  /*async getSongs() {
		const songs = await this.songService.getSongs();
		songs.data.forEach(song => this.songList.push(song))
	  }*/

	  async openSnackBar(message: string, action: string) {
		const alert = await this.alertController.create({
		  header: message,
		  buttons: [action]
		});
		await alert.present();
	  }
}
