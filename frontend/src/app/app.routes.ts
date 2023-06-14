import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }



];
