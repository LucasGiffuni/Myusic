import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="album-component">
    <img class="album-component-cover" src="https://iili.io/HlHy9Yx.png" (click)="routing()">
    <h2 class="album-component-title" (click)="routing()">{{this.album.titulo}}</h2>

    <div class="album-remove"  (click)="removeFromAlbum()">
        <i
            id="searchButton"
            class="material-icons w3-xxxlarge"

            >remove</i
          >
        </div>
  </div>

  `,
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  @Input() album!: IAlbum
  @Input() getAlbums!: Function;
  AlbumService: AlbumService = inject(AlbumService);

  constructor(private router: Router, private route2: ActivatedRoute) {}

  removeFromAlbum() {
    this.AlbumService.removelbum(this.album.idAlbum);
    this.getAlbums();
  }

  routing() {
    this.route('/albumsongs/' + this.album.idAlbum)
  }
  route(path: string) {
    this.router.navigate([path]);
  }

}
