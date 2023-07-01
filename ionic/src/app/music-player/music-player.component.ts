import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ISong } from '../interfaces/Isong';
import { CookieService } from '../services/cookie.service';
import { SongService } from '../services/song.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  standalone: true,
  imports: [RouterModule, IonicModule, FormsModule, YouTubePlayerModule],
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent  implements OnInit {

	songService!: SongService;
	cookieService!: CookieService;

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
  volume: number = 50;

  @ViewChild('youtubePlayer') youtubePlayer: any;

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) {
		this.songService = inject(SongService);
		this.cookieService = inject(CookieService);
   }

  ngOnInit() {
    if (!this.apiLoaded) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.cookieService.remove("SELECTEDSONG")
        this.cookieService.set("SELECTEDSONG", String(this.id));
		console.log("estaid"+this.id)
        this.songService.getSongByID(this.id).then((response) => {
          if (response.Result.statuscode === "403") {
            this.openSnackBar("Session expired", "Cerrar")

            this.router.navigate(['/login']);
          } else {
            this.selectedSong = response.data[0]
            console.log(this.selectedSong)

            this.splitted = this.selectedSong.linkReferencia.split("=")[1]
            console.log(this.splitted);
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  onPlayerReady(event: any) {
    this.player = event.target;
    this.updateVolume();
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

  updateVolume() {
    this.player.setVolume(this.volume);
  }

  splitLink(link: string) {
    return link.split("=")[1];
  }

  async openSnackBar(message: string, action: string) {
	const alert = await this.alertController.create({
	  header: message,
	  buttons: [action]
	});
	await alert.present();
  }

}
