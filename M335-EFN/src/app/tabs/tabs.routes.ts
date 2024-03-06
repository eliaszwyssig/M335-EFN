import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sjtab',
        loadComponent: () =>
          import('../sjtab/sjtab.page').then((m) => m.SjtabPage),
      },
      {
        path: 'lbtab',
        loadComponent: () =>
          import('../lbtab/lbtab.page').then((m) => m.LbtabPage),
      },
      {
        path: '',
        redirectTo: '/tabs/sjtab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/sjtab',
    pathMatch: 'full',
  },
];
