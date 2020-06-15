import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaMapPage } from './area-map.page';

const routes: Routes = [
  {
    path: '',
    component: AreaMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaMapPageRoutingModule {}
