import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'permissions',
    loadComponent: () => import('./permissions/permissions.page').then( m => m.PermissionsPage)
  },
  {
    path: 'aufgabe1',
    loadComponent: () => import('./aufgabe1/aufgabe1.page').then( m => m.Aufgabe1Page)
  },
  {
    path: 'aufgabe2',
    loadComponent: () => import('./aufgabe2/aufgabe2.page').then( m => m.Aufgabe2Page)
  },
  {
    path: 'aufgabe3',
    loadComponent: () => import('./aufgabe3/aufgabe3.page').then( m => m.Aufgabe3Page)
  },   {
    path: 'aufgabe4',
    loadComponent: () => import('./aufgabe4/aufgabe4.page').then( m => m.Aufgabe4Page)
  },
  {
    path: 'aufgabe5',
    loadComponent: () => import('./aufgabe5/aufgabe5.page').then( m => m.Aufgabe5Page)
  },
  {
    path: 'aufgabe6',
    loadComponent: () => import('./aufgabe6/aufgabe6.page').then( m => m.Aufgabe6Page)
  },



];
