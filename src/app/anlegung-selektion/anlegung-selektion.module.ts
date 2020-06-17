import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnlegungSelektionPageRoutingModule } from './anlegung-selektion-routing.module';

import { AnlegungSelektionPage } from './anlegung-selektion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnlegungSelektionPageRoutingModule
  ],
  declarations: [AnlegungSelektionPage]
})
export class AnlegungSelektionPageModule {}
