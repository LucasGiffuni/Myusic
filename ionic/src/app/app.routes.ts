import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
	redirectTo: 'songList',
    //redirectTo: 'folder/inbox',
	//redirectTo: 'musicPlayer',
    pathMatch: 'full',
  },
  {
    path: 'musicPlayer',
	loadComponent: () =>
	  import('./music-player/music-player.component').then((m) => m.MusicPlayerComponent)
  },
  {
    path: 'musicPlayer/:id',
	loadComponent: () =>
	  import('./music-player/music-player.component').then((m) => m.MusicPlayerComponent)
  },
  {
    path: 'songList',
	loadComponent: () =>
	  import('./song-list/song-list.component').then((m) => m.SongListComponent)
  },
];
