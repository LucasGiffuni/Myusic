import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumService } from 'src/app/services/album.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { ISong } from 'src/app/interfaces/ISong';
import { CookieService } from 'src/app/services/cookie.service';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-album',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatButtonModule, MatInputModule, MatSnackBarModule],
  template: `
    <div mat-dialog-content>
      <h1>Add Song to Album</h1>
      <mat-form-field>
        <mat-label>Album</mat-label>
        <select matNativeControl (change)="selectAlbum($event)">
          <option value=""></option>
          <option *ngFor="let option of albumList" [value]="option.titulo"
                  [selected]="selectedAlbumTitle === option.titulo">{{ option.titulo }}</option>
        </select>
      </mat-form-field>
      <div mat-dialog-actions>
        <button mat-flat-button color="primary" mat-dialog-close cdkFocusInitial (click)="addSongToAlbum()">Add to Album</button>
      </div>
    </div>
  `,
  styleUrls: ['./add-to-album.component.css']
})
export class AddToAlbumComponent {
  albums = new FormControl('');

  albumList!: IAlbum[];
  albumService: AlbumService = inject(AlbumService);
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  @Input() song!: ISong;


  id!: number;

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

  selectedAlbumTitle!: string;
  selectedAlbum!: IAlbum;

  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.id = this.cookieService.get("SELECTEDSONG");
    this.albumService.getUserAlbums(this.cookieService.get("USERID")).then((response) => {
      if (response.Result.statuscode === "403") {
        this.openSnackBar("Session expired", "Cerrar")

        this.router.navigate(['/login']);
      } else {
        this.albumList = response.data
      }
    })

    this.songService.getSongByID(this.id).then((response) => {
      if (response.Result.statuscode === "403") {
        this.openSnackBar("Session expired", "Cerrar")

        this.router.navigate(['/login']);
      } else {
        this.selectedSong = response.data[0]
      }

    })
  }


  addSongToAlbum() {
    const songID = this.selectedSong.idCancion;
    const albumID = this.selectedAlbum.idAlbum;
    const data = {
      songID,
      albumID
    }

    this.albumService.addSongToAlbum(data).then((response) => {
      if (response.Result.statuscode === '200') {
        this.openSnackBar("La cancion " + this.selectedSong.titulo + " fue agregada correctamente al album " + this.selectedAlbum.titulo, "Cerrar")

      }
    })
  }

  selectAlbum(event: Event) {
    this.selectedAlbumTitle = (event.target as HTMLSelectElement).value;
    this.selectedAlbum = this.albumList.find(i => i.titulo === this.selectedAlbumTitle)!;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
