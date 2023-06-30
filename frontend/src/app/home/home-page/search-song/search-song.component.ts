import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResponse } from 'src/app/interfaces/IResponse';
import { ISong } from 'src/app/interfaces/ISong';
import { SongService } from 'src/app/services/song.service';
import { CookieService } from 'src/app/services/cookie.service';
import { SongLatestComponent } from '../song/song-latest/song-latest.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-song',
  standalone: true,
  template: `

      <div class="library-component-outstanding">
        <div
          #listSongOutStanding
          class="library-component-songOutStanding-list"
        >
          <app-song-latest
            class="songOutStanding-component"
            *ngFor="let song of this.songListOutStanding"
            [song]="song"
          ></app-song-latest>
        </div>
      </div>
  `,
  styleUrls: ['./search-song.component.css'],
  imports: [CommonModule, SongLatestComponent],
})
export class SearchSongComponent {
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  songListOutStanding: ISong[] = [];

  id!: string;
  private sub: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSongBySearchValue();
  }
  async getSongBySearchValue() {
    this.sub = this.route.params.subscribe((params) => {
      const searchValue = this.cookieService.get('SEARCHVALUE');
      const data = {
        searchValue,
      };
      this.songListOutStanding = [];

      this.songService
        .getSongBySearchValue(data)
        .then((value: IResponse<ISong>) => {
          value.data.forEach((element) => {
            this.songListOutStanding.push(element);
            console.log('titulo: ' + element.titulo);
          });
          console.log(this.songListOutStanding);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
