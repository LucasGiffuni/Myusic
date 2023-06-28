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

@Component({
  selector: 'app-create-album-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  template: `
  <h1 mat-dialog-title>CreateAlbumDialog</h1>
  <div mat-dialog-content>
  <input type="text" id="albumTitle" placeholder="Album Title"  (input)="albumTitleInput($event)">
  <input type="text" id="albumDescription" placeholder="Album Description" (input)="albumDescriptionInput($event)">

  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button mat-dialog-close cdkFocusInitial (click)="createAlbum()">Create</button>
</div>
`,
  styleUrls: ['./create-album-dialog.component.css']
})
export class CreateAlbumDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateAlbumDialogComponent>, private _snackBar: MatSnackBar) { }
  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  albumTitle: string = "";
  albumDescription: string = "";




  albumTitleInput(event: any) {
    this.albumTitle = event.target.value
  }
  albumDescriptionInput(event: any) {
    this.albumDescription = event.target.value
  }
  createAlbum() {

    const data: IAlbum = {
      idAlbum: 0,
      titulo: this.albumTitle,
      descripcion: this.albumDescription,
      fechaCreacion: new Date("now"),
      idUsuario: this.cookieService.get("USERID")
    }
    if (this.albumDescription || this.albumTitle) {
      if(this.albumTitle.length <= 30){
      this.albumService.createAlbum(data.idUsuario, data).then((response: IResponse<any>) =>{
        if (response.Result.statuscode === "200"){
          this.openSnackBar("Album " + this.albumTitle + " creado correctamente!", "Cerrar");
          setTimeout(() => {
            location.reload();
          }, 3000);
        }else{
          this.openSnackBar("ERROR: " + response.Result.statustext, "Cerrar");
        }
      });
    }else{
      this.openSnackBar("Titulo debe ser menor o igual a 30 caracteres", "Cerrar");
    }

    }else{
      this.openSnackBar("Titulo o Descripcion no puede ser nulo", "Cerrar");

    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }
}
