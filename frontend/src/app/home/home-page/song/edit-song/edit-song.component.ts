import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { SongService } from 'src/app/services/song.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'src/app/services/cookie.service';
import { IResponse } from 'src/app/interfaces/IResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">

   <div class="editSong">
    <div class="form-group">
      <h1 id="editSong-component-title">Song</h1>
      <label for="Title">Title:</label>
      <input type="text" id="title" value="{{song.titulo}}"  class="editSongInput"  (focusout)="onFocusOutTitle($event)">
      <label for="Genre">Genre:</label>
      <input type="text" id="password" value="{{song.genero}}"  class="editSongInput" (focusout)="onFocusOutGenre($event)">
      <label for="Autor">Autor:</label>
      <input type="text" id="password" value="{{song.autor}}"  class="editSongInput" (focusout)="onFocusOutAutor($event)">
      <label for="ReleaseDate">Release Date:</label>
      <input type="text" id="password" value="{{song.fechaLanzamiento}}"  class="editSongInput" (focusout)="onFocusOutReleaseDate($event)">
      <label for="Source Link">Source Link:</label>
      <input type="text" id="password" value="{{song.linkReferencia}}" class="editSongInput" (focusout)="onFocusOutSourceLink($event)">
      <label for="a Link">Image Link:</label>
      <input type="text" id="password" value="image" class="{{song.imagen}}" (focusout)="onFocusOutImageLink($event)">
      <button (click)="editSong()">Edit</button>
    </div>
  </div>
    </div>
  `,
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent {

  @Input() song!: ISong;
  // changedSong: ISong = this.song;

  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    this.song = data.song;
    this.song.idUsuario = parseInt(this.cookieService.get("USERID"));
  }

  onFocusOutTitle(event: any) {
    this.song.titulo = event.target.value;
  }
  onFocusOutGenre(event: any) {
    this.song.genero = event.target.value;
  }
  onFocusOutAutor(event: any) {
    this.song.autor = event.target.value;
  }
  onFocusOutReleaseDate(event: any) {
    this.song.fechaLanzamiento = event.target.value;
  }
  onFocusOutSourceLink(event: any) {
    this.song.linkReferencia = event.target.value;
  }
  onFocusOutImageLink(event: any) {
    this.song.imagen = event.target.value;
  }

  editSong(){
    this.songService.updateSong(this.song).then((response : IResponse<any>)=>{
      if(response.Result.statuscode === "404"){
        this.openSnackBar("Song not found for this user", "Cerrar");
      }else{
        if(response.Result.statuscode === "200"){
          this.openSnackBar("Song update!", "Cerrar");
        }else{
          this.openSnackBar("Error in the server", "Cerrar");
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }
}
