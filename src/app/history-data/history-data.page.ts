import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings/settings.service';
import {Data} from '../model/data';
import {DataService} from '../services/data/data.service';

@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.page.html',
  styleUrls: ['./history-data.page.scss'],
})
export class HistoryDataPage implements OnInit {
  public data: Data;
  constructor(private settingsService: SettingsService, private dataService: DataService) { }

  ngOnInit() {
    this.data = this.settingsService.currentData;
  }

  public deleteData() {
    this.dataService.delete(this.data);
    this.settingsService.currentData = null;
  }

}
