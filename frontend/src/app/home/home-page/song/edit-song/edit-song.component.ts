import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';

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
      <input type="text" id="title" value="{{song.title}}"  class="editSongInput">
      <label for="Genre">Genre:</label>
      <input type="text" id="password" value="{{song.genre}}"  class="editSongInput">
      <label for="Autor">Autor:</label>
      <input type="text" id="password" value="{{song.autor}}"  class="editSongInput">
      <label for="ReleaseDate">Release Date:</label>
      <input type="text" id="password" value="{{song.releaseDate}}"  class="editSongInput">
      <label for="Source Link">Source Link:</label>
      <input type="text" id="password" value="{{song.sourceLink}}" class="editSongInput" >
      <label for="a Link">Image Link:</label>
      <input type="text" id="password" value="{{song.imageCoverLink}}" class="editSongInput" >
      <button >Edit</button>

    </div>
  </div>
    </div>
  `,
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent {

  @Input() song!: ISong;
}
