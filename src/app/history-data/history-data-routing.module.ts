import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryDataPage } from './history-data.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryDataPageRoutingModule {}
