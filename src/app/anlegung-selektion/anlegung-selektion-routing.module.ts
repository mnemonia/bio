import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnlegungSelektionPage } from './anlegung-selektion.page';

const routes: Routes = [
  {
    path: '',
    component: AnlegungSelektionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnlegungSelektionPageRoutingModule {}
