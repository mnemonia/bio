import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'area-map',
    loadChildren: () => import('./area-map/area-map.module').then( m => m.AreaMapPageModule)
  },  {
    path: 'history-data',
    loadChildren: () => import('./history-data/history-data.module').then( m => m.HistoryDataPageModule)
  },
  {
    path: 'anlegung-selektion',
    loadChildren: () => import('./anlegung-selektion/anlegung-selektion.module').then( m => m.AnlegungSelektionPageModule)
  },
  {
    path: 'photo-booth',
    loadChildren: () => import('./photo-booth/photo-booth.module').then( m => m.PhotoBoothPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
