import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from "./album/album.component";

@Component({
  selector: 'app-library',
  standalone: true,
  template: `
  <div id="library-component">
    <h1 id="library-component-album-title"> Tus Albums</h1>
    <div id="library-component-album-list">
      <app-album id="album-component"></app-album>
      <app-album id="album-component"></app-album>
      <app-album id="album-component"></app-album>

      <app-album id="album-component"></app-album>
      <app-album id="album-component"></app-album>
      <app-album id="album-component"></app-album>


    </div>

  </div>
  `,

  styleUrls: ['./library.component.css'],
  imports: [CommonModule, AlbumComponent]
})
export class LibraryComponent {

}
