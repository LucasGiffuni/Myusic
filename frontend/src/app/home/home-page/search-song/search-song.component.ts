import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResponse } from 'src/app/interfaces/IResponse';
import { ISong } from 'src/app/interfaces/ISong';
import { SongService } from 'src/app/services/song.service';
import { CookieService } from 'src/app/services/cookie.service';
import { SongLatestComponent } from '../song/song-latest/song-latest.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  imports: [CommonModule, SongLatestComponent,MatSnackBarModule],
})
export class SearchSongComponent {
  songService: SongService = inject(SongService);
  cookieService: CookieService = inject(CookieService);

  songListOutStanding: ISong[] = [];

  id!: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

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
          if (value.Result.statuscode === "403") {
            this.openSessionSnackBar("Session expired", "Cerrar")

            this.router.navigate(['/login']);
          } else {
            value.data.forEach((element) => {
              this.songListOutStanding.push(element);
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  openSessionSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
