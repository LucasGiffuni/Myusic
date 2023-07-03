import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { IAlbumCancion } from 'src/app/interfaces/IAlbumCancion';

@Component({
  selector: 'app-song-album',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class = "song-latest-component">

        <img class = "image-song" src={{this.song.imagen}} (click)="routing()">

        <div class ="song-info" (click)="routing()">

          <h2 class = "song-title">{{this.song.titulo}}</h2>
          <h2 class = "author-band">{{this.song.autor}}</h2>
        </div>

        <div class="song-remove"  (click)="removeFromAlbum()">
        <i
            id="searchButton"
            class="material-icons w3-xxxlarge"

            >remove</i
          >
        </div>
    </div>


  `,
  styleUrls: ['./song-album.component.css']
})
export class SongAlbumComponent {
  @Input() song!: IAlbumCancion;
  AlbumService: AlbumService = inject(AlbumService);
  id!: number;
  private sub: any;


  @Input() obtainAlbumSongs!: Function;

  constructor(private router: Router, private route2: ActivatedRoute) {
  }

  removeFromAlbum() {
    const songID = this.song.idCancion;
    const albumID = this.id;
    const idCancionAlbum = this.song.idCancionAlbum

    const data = {
      idCancionAlbum
    }
    this.AlbumService.removeSongFromAlbum(data);
    this.obtainAlbumSongs();
  }

  ngOnInit() {

    console.log(this.song)
    this.sub = this.route2.params.subscribe(params => {
      this.id = +params['idAlbum']; // (+) converts string 'id' to a number\
    });
  }

  routing() {
    this.route('/songDetail/' + this.song.idCancion)
  }
  route(path: string) {
    this.router.navigate([path]);
  }



}
