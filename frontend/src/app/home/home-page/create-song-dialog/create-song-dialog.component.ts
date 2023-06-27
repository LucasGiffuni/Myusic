import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { CookieService } from 'src/app/services/cookie.service';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IResponse } from 'src/app/interfaces/IResponse';
import { ISong } from 'src/app/interfaces/ISong';
@Component({
  selector: 'app-create-song-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  template: `
  <h1 mat-dialog-title>CreateAlbumDialog</h1>
  <div mat-dialog-content>
  <input type="text" id="songTitle" placeholder="Song Title"  (input)="SongTitleInput($event)">
  <input type="text" id="songGenre" placeholder="Song Genre" (input)="SongGenreInput($event)">
  <input type="text" id="releaseDate" placeholder="Release Date (YYYY-MM-DD)"  (input)="SongDateInput($event)">
  <input type="text" id="referenceLink" placeholder="Reference Link" (input)="SongLinkInput($event)">
  <input type="text" id="autor" placeholder="Song Author / Band"  (input)="SongAutorInput($event)">
  <input type="text" id="image" placeholder="Song image" (input)="SongimageInput($event)">
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button mat-dialog-close cdkFocusInitial (click)="createAlbum()">Create</button>
</div>
`,
  styleUrls: ['./create-song-dialog.component.css']
})
export class CreateSongDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateSongDialogComponent>, private _snackBar: MatSnackBar) { }
  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  songTitle: string = "";
  genero: string = "";
  fechaLanzamiento: string = "";
  linkReferencia: string = "";
  autor: string = "";
  imagen: string = "";




  SongTitleInput(event: any) {
    this.songTitle = event.target.value
  }
  SongGenreInput(event: any) {
    this.genero = event.target.value
  }
  SongDateInput(event: any) {
    this.fechaLanzamiento = event.target.value
  }
  SongLinkInput(event: any) {
    this.linkReferencia = event.target.value
  }
  SongAutorInput(event: any) {
    this.autor = event.target.value
  }
  SongimageInput(event: any) {
    this.imagen = event.target.value
  }

  createAlbum() {

    const data: ISong = {
      idCancion: 0,
      titulo: this.songTitle,
      genero: this.genero,
      fechaLanzamiento: new Date(this.fechaLanzamiento),
      linkReferencia: this.linkReferencia,
      autor: this.autor,
      vecesReproducidas: 0,
      imagen: this.imagen,
      idUsuario: 24
    }

    if (this.songTitle || this.genero || this.fechaLanzamiento || this.autor || this.imagen) {
      this.songService.createSong(data.idUsuario, data).then((response: IResponse<any>) => {
        if (response.Result.statuscode === "200") {
          this.openSnackBar("Song " + this.songTitle + " creado correctamente!", "Cerrar")

        } else {
          this.openSnackBar("ERROR: " + response.Result.statustext, "Cerrar")
        }
      });

    } else {
      this.openSnackBar("Los datos no pueden ser nulos o vacios", "Cerrar")

    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }
}
