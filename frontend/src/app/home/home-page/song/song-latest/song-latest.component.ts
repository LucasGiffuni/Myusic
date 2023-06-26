import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISong } from 'src/app/interfaces/ISong';

@Component({
  selector: 'app-song-latest',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class = "song-latest-component">
        <img class = "image-song" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3c834d15-e9f9-4b90-83fb-1c28c2f13eb1/d12cw4e-4001ae56-df8e-461a-a9b4-00ae4de37ac7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNjODM0ZDE1LWU5ZjktNGI5MC04M2ZiLTFjMjhjMmYxM2ViMVwvZDEyY3c0ZS00MDAxYWU1Ni1kZjhlLTQ2MWEtYTliNC0wMGFlNGRlMzdhYzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2Plzkv3cukeVaJf1wf14EbX9mg9P1sKIRD12pChd8jY">
        <div class ="song-info">
          <h2 class = "song-title">titulo</h2>
          <h2 class = "author-band">autor</h2>
        <div>
    </div>
  `,
  styleUrls: ['./song-latest.component.css']
})
export class SongLatestComponent {
  @Input() song! : ISong;
}