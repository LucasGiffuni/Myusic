import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      song works!
    </p>
  `,
  styleUrls: ['./song.component.css']
})
export class SongComponent {

}
