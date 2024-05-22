import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'breed/:id',
    loadComponent: () =>
      import('./pages/breed-detail/breed-detail.component').then(
        (c) => c.BreedDetailComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
