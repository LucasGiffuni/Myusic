import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { ISong } from '../interfaces/Isong';
import { CookieService } from '../services/cookie.service';
import { SongService } from '../services/song.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  standalone: true,
  imports: [RouterModule, IonicModule, FormsModule, YouTubePlayerModule, CommonModule],
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
  videoURL: SafeResourceUrl = 'https://youtu.be/' + this.videoId;
  open: boolean = true;

  @ViewChild('youtubePlayer') youtubePlayer!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController, private sanitizer: DomSanitizer) {
		this.songService = inject(SongService);
		this.cookieService = inject(CookieService);
   }

   ngAfterViewInit() {
    // Initialize the YouTube player once the view is initialized
    (window as any).onYouTubeIframeAPIReady = () => {
      this.player = new (window as any).YT.Player(this.youtubePlayer.nativeElement, {
        videoId: this.videoId,
        events: {
          onReady: this.onPlayerReady.bind(this),
        },
      });
    };
  }

  ngOnInit() {
	this.open = true;
    if (!this.apiLoaded) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.cookieService.remove("SELECTEDSONG")
        this.cookieService.set("SELECTEDSONG", String(this.id));
        this.songService.getSongByID(this.id).then((response) => {
          if (response.Result.statuscode === "403") {
            this.openSnackBar("Session expired", "Cerrar")
            this.router.navigate(['/login']);
          } else {
            this.selectedSong = response.data[0]
            this.splitted = this.selectedSong.linkReferencia.split("=")[1]
            this.videoId = this.splitted
			console.log("URL: "+'https://www.youtube.com/embed/'+this.videoId);
			this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videoId);
			console.log("URL"+this.videoURL);
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

  onYouTubeIframeAPIReady() {
    return this.player = new YT.Player('iframe-id', {
      videoId: 'this.videoId',
      events: {
        'onReady': this.onPlayerReady,
      }
    });
}




  pinFormatter(value: number) {
    return `${value}%`;
  }

  onPlayerReady(event: any) {
    this.player = this.onYouTubeIframeAPIReady();//= event.target;
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
