import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home/components/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'files',
    loadComponent: () => import('./modules/files/components/files-mgm/files.component').then((m) => m.FilesComponent)
  }
];
