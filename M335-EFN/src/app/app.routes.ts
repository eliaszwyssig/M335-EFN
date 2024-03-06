import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'permissions',
    loadComponent: () => import('./permissions/permissions.page').then( m => m.PermissionsPage)
  },
  {
    path: 'aufgabe1',
    loadComponent: () => import('./aufgabe1/aufgabe1.page').then( m => m.Aufgabe1Page)
  },

];
