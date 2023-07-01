import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { ISong } from 'src/app/interfaces/Isong';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  styleUrls: ['./song.component.scss'],
})
export class SongComponent  implements OnInit {

	@Input() song! : ISong;
  constructor() { }

  ngOnInit() {}
  private platform = inject(Platform);
  isIos() {
    return this.platform.is('ios')
  }
}
