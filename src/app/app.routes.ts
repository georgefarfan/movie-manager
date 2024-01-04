import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    children: [
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
