import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './home/library/library.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SongDetailComponent } from './home/home-page/song-detail/song-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: LibraryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'songDetail', component: SongDetailComponent }
];

export default routes;
