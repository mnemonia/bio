import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryDataPageRoutingModule } from './history-data-routing.module';

import { HistoryDataPage } from './history-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryDataPageRoutingModule
  ],
  declarations: [HistoryDataPage]
})
export class HistoryDataPageModule {}
