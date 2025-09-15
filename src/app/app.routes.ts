import { Routes } from '@angular/router';
import { authRoutes } from './feature/auth/auth.routes';

const loadAuthLayout = () => import('@feature/auth/layout/auth-layout.component');

export const routes: Routes = [
  {
    path: '',
    loadComponent: loadAuthLayout,
    children: authRoutes,
  },
];
