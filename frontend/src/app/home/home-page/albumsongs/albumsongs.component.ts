import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from '@angular/router';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { ISong } from 'src/app/interfaces/ISong';
import { SongComponent } from '../song/song.component';


@Component({
    selector: 'app-albumsongs',
    standalone: true,
    template: `
   <div>
   <app-song class = "song-component" *ngFor="let song of this.Songs" [song]="song"></app-song>
</div>
  `,
    styleUrls: ['./albumsongs.component.css'],
    imports: [CommonModule, SongComponent]
})
export class AlbumsongsComponent {
  Album!: IAlbum ;
  Songs: ISong[] = [
    {
      idCancion: 60,
      titulo: "lo",
      genero: "rock",
      fechaLanzamiento: new Date ("now"),
      linkReferencia: 'ho',
      autor: 'h',
      vecesReproducidas: 12,
      imagen: "www.",
      idUsuario: 12
    }
  ]
  
  id!: number;
  private sub: any;


      

  AlbumService: AlbumService=inject(AlbumService);
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['idAlbum']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.AlbumService.getAlbumsDetails(this.id).then((result) => {this.Album=result.data[0]});
      console.log(this.Album);
    });
 

  }


}
