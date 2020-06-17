import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoBoothPageRoutingModule } from './photo-booth-routing.module';

import { PhotoBoothPage } from './photo-booth.page';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      WebcamModule,
    PhotoBoothPageRoutingModule
  ],
  declarations: [PhotoBoothPage]
})
export class PhotoBoothPageModule {}
