import { Injectable } from '@angular/core';
import {Data} from '../../model/data';

export class Settings {
  is_howto_checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private STORAGE_KEY = 'ch.capturetec.bio.settings.v1';
  private _currentData: Data;
  private settings: Settings;

  constructor() {
    window.localStorage.removeItem('ch.capturetec.bio.settings.v0');
    const dataAsString = window.localStorage.getItem(this.STORAGE_KEY);
    console.log('dataAsString', dataAsString);
    if (dataAsString) {
      try {
        this.settings = JSON.parse(dataAsString);
      } catch (e) {
      }
    }
    console.log('this.settings', this.settings);
    if (this.settings === undefined || this.settings === null) {
      this.settings = new Settings();
      this.settings.is_howto_checked = false;
      this.save();
    }
  }

  public set currentData(d: Data) {
    this._currentData = d;
  }
  public get currentData() {
    return this._currentData;
  }

  public save() {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
  }

  public getSettings() {
    return this.settings;
  }
}
