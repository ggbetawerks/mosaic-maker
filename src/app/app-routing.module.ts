import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mosaic',
    pathMatch: 'full',
  },

  {
    path: 'mosaic',
    loadChildren: () =>
      import('./mosaic/mosaic.module').then((m) => m.MosaicPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
