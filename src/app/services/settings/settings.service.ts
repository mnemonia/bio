import { Injectable } from '@angular/core';
import {Data} from '../../model/data';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _currentData: Data;

  constructor() { }

  public set currentData(d: Data) {
    this._currentData = d;
  }
  public get currentData() {
    return this._currentData;
  }
}
