import { Component } from '@angular/core';
import {DataService} from '../services/data/data.service';
import {Data} from '../model/data';
import {NavController} from '@ionic/angular';
import {SettingsService} from '../services/settings/settings.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data: Data[];

  constructor(private dataService: DataService,
              private navCtrl: NavController,
              private settingsService: SettingsService) {
    this.data = this.dataService.getAreas();
  }

  public openPage(d: Data) {
    this.settingsService.currentData = d;
    this.navCtrl.navigateForward('/history-data');
  }

}
