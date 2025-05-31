import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./features/movies/movies.routes').then(m => m.moviesRoutes),
  },
  {
    path: '**',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];
