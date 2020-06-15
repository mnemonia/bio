import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {SwissMapComponent} from './swiss-map/swiss-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SwissMapComponent],
  exports: [SwissMapComponent]

})
export class CompsModule {}
