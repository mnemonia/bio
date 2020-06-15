import { Injectable } from '@angular/core';
import {Data} from '../../model/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private STORAGE_KEY = 'ch.capturetec.bio.data.v1';
  private data: Data = null;
  private areas: Data[] = [];

  constructor() {
    window.localStorage.removeItem('ch.capturetec.bio.data.v0');
    const dataAsString = window.localStorage.getItem(this.STORAGE_KEY);
    if (dataAsString) {
      try {
        JSON.parse(dataAsString).data.forEach(d => this.data = d);
      } catch (e) {

      }
      try {
        JSON.parse(dataAsString).areas.forEach(d => this.areas.push(d));
      } catch (e) {

      }
    }
  }

  public getData() {
    if (this.data === null) {
      this.data = this.newData();
    }
    return this.data;
  }

  public newData() {
    const data = new Data();
    data.id = 'id-' + Math.round(Math.random() * 1000);
    data.address_canonical = '';
    data.area_in_m2 = 0;
    data.area_name = 'Mis nüä Biogärtli';
    data.area_polyline = [];
    data.base64_jpeg_image = '';
    data.email = '';
    data.surname = '';
    data.lastname = '';
    data.is_historized = false;
    this.data = data;
    return data;
  }

  public saveData() {
    const theData = {
      "data": [this.data],
      "areas": this.areas
    };
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theData));
  }

  public addToHistory(data: Data) {
    data.is_historized = true;
    this.areas.push(data);
    this.saveData();
  }

  public getAreas() {
    return this.areas;
  }

  public delete(data: Data) {
    this.areas = this.areas.filter(d => d.id !== data.id);
    if (this.data === data) {
      this.data = this.newData();
    }
    this.saveData();
  }
}
