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
      <input type="text" id="title" value="{{song.title}}"  class="editSongInput"  (focusout)="onFocusOutTitle($event)">
      <label for="Genre">Genre:</label>
      <input type="text" id="password" value="{{song.genre}}"  class="editSongInput" (focusout)="onFocusOutGenre($event)">
      <label for="Autor">Autor:</label>
      <input type="text" id="password" value="{{song.autor}}"  class="editSongInput" (focusout)="onFocusOutAutor($event)">
      <label for="ReleaseDate">Release Date:</label>
      <input type="text" id="password" value="{{song.releaseDate}}"  class="editSongInput" (focusout)="onFocusOutReleaseDate($event)">
      <label for="Source Link">Source Link:</label>
      <input type="text" id="password" value="{{song.sourceLink}}" class="editSongInput" (focusout)="onFocusOutSourceLink($event)">
      <label for="a Link">Image Link:</label>
      <input type="text" id="password" value="{{song.imageCoverLink}}" class="editSongInput" (focusout)="onFocusOutImageLink($event)">
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
    this.changedSong.title = event.target.value
  }
  onFocusOutGenre(event: any) {
    this.changedSong.genre = event.target.value
  }
  onFocusOutAutor(event: any) {
    this.changedSong.autor = event.target.value
  }
  onFocusOutReleaseDate(event: any) {
    this.changedSong.releaseDate = event.target.value
  }
  onFocusOutSourceLink(event: any) {
    this.changedSong.sourceLink = event.target.value
  }
  onFocusOutImageLink(event: any) {
    this.changedSong.imageCoverLink = event.target.value
  }

  editSong(){
    
  }
}
