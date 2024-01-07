import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
