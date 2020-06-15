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
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
