import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaMapPageRoutingModule } from './area-map-routing.module';

import { AreaMapPage } from './area-map.page';
import {CompsModule} from '../comps/comps.module';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      CompsModule,
      WebcamModule,
    AreaMapPageRoutingModule
  ],
  declarations: [AreaMapPage]
})
export class AreaMapPageModule {}
