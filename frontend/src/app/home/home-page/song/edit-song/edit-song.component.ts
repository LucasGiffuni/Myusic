import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';
import { SongService } from 'src/app/services/song.service';

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
  changedSong: ISong = this.song;

  songService: SongService = inject(SongService);

  onFocusOutTitle(event: any) {
    this.changedSong.titulo = event.target.value
  }
  onFocusOutGenre(event: any) {
    this.changedSong.genero = event.target.value
  }
  onFocusOutAutor(event: any) {
    this.changedSong.autor = event.target.value
  }
  onFocusOutReleaseDate(event: any) {
    this.changedSong.fechaLanzamiento = event.target.value
  }
  onFocusOutSourceLink(event: any) {
    this.changedSong.linkReferencia = event.target.value
  }
  onFocusOutImageLink(event: any) {
    this.changedSong.imagen = event.target.value
  }

  editSong(){
    this.songService.updateUser(this.changedSong);
  }
}
