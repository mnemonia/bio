import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {WebcamModule} from 'ngx-webcam';
import {GeoApiService} from './services/geoapi/geo-api.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data/data.service';
import {BioApiService} from './services/bioapi/bio-api.service';
import {SettingsService} from './services/settings/settings.service';
import {AnlegungService} from './services/anlegung/anlegung.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, WebcamModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    GeoApiService,
      DataService,
      BioApiService,
      SettingsService,
      AnlegungService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
