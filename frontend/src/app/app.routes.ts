import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SongDetailComponent } from './home/home-page/song-detail/song-detail.component';

import { EditSongComponent } from './home/home-page/song/edit-song/edit-song.component';
import { SearchSongComponent } from './home/home-page/search-song/search-song.component';
import { AlbumsongsComponent } from './home/home-page/albumsongs/albumsongs.component';
import { ChangUserNameComponent } from './home/profile/chang-user-name/chang-user-name.component';
import { ChangpaswordComponent } from './home/profile/changpasword/changpasword.component';
import { ProfileComponent } from './home/profile/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'changePassword', component:ChangpaswordComponent},
  { path: 'changeUserName', component:ChangUserNameComponent},
  { path: 'songDetail/:id', component: SongDetailComponent },
  { path: 'editSong', component: EditSongComponent },
  { path: "searchSong/:searchValue" , component: SearchSongComponent},
  { path: "albumsongs/:idAlbum", component:AlbumsongsComponent}
];

export default routes;
