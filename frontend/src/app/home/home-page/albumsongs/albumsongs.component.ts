import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from '@angular/router';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { ISong } from 'src/app/interfaces/ISong';
import { SongComponent } from '../song/song.component';
import { SongAlbumComponent } from "../song/song-album/song-album.component";
import { IAlbumCancion } from 'src/app/interfaces/IAlbumCancion';


@Component({
  selector: 'app-albumsongs',
  standalone: true,
  template: `
   <div id="albumSongsComponent" *ngIf="renderFlag">
    <div id="albumImage" >
    <h1>{{Album.titulo}}</h1>

      <div class="outer-grid" *ngIf="imageCollageFlag">
        <div class="inner-grid">
          <img src="{{Songs[0].imagen}}"/>
          <img src="{{Songs[1].imagen}}"/>

        </div>
        <div class="inner-grid">
          <img src="{{Songs[2].imagen}}"/>
          <img src="{{Songs[3].imagen}}"/>
        </div>
    </div>

   <hr>
   <div id="albumSongs" >

      <div id="albumSongsList">
        <app-song-album class = "songLatest-component" *ngFor="let song of this.Songs" [song]="song" [obtainAlbumSongs]="obtainAlbumSongs.bind(this)"></app-song-album>
      </div>
   </div>

   </div>
  `,
  styleUrls: ['./albumsongs.component.css'],
  imports: [CommonModule, SongComponent, SongAlbumComponent]
})
export class AlbumsongsComponent {
  Album: IAlbum = {
    idAlbum: 999999,
    titulo: "",
    descripcion: "",
    fechaCreacion: new Date("now"),
    idUsuario: 0,
  };
  Songs: IAlbumCancion[] = [
    {
      idCancionAlbum:999999,
      idCancion: 999999,
      titulo: "",
      genero: "",
      fechaLanzamiento: new Date("now"),
      linkReferencia: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autor: '',
      vecesReproducidas: 12,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyEKIq_a7eWEwVEoo1aTBQ6gV1KQ4BI8ojEQgnl0ITQ&s",
      idUsuario: 12
    }
  ]

  id!: number;
  private sub: any;
  renderFlag = false
  imageCollageFlag = false


  AlbumService: AlbumService = inject(AlbumService);
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['idAlbum']; // (+) converts string 'id' to a number\

      this.AlbumService.getAlbumsDetails(this.id).then((result) => {
        this.Album = result.data[0]
      });
      this.obtainAlbumSongs();


    });
  }

  public obtainAlbumSongs() {
    this.renderFlag = false
    this.Songs = []
    this.AlbumService.getAlbumsSongs(this.id).then((result) => {
      this.Songs = result.data
      if (result.data.length >= 4) {
        this.imageCollageFlag = true
      }
      this.renderFlag = true
    })
  }

}
