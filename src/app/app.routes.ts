import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];
