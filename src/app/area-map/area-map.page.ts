import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwissMapComponent} from '../comps/swiss-map/swiss-map.component';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {GeoApiService} from '../services/geoapi/geo-api.service';

@Component({
  selector: 'app-area-map',
  templateUrl: './area-map.page.html',
  styleUrls: ['./area-map.page.scss'],
})
export class AreaMapPage implements OnInit {
  @ViewChild('swissymappy', {static: true}) mapElement: SwissMapComponent;
  points = [];
  area = 0;
  public areaScaled = 0;
  public areaName = 'Mis nüä Biogärtli';
  public isTakePicture = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public searchQuery = '';
  public locations = [];
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private geoApi: GeoApiService) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevices: MediaDeviceInfo[]) => {
          this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        });
    this.points.push([]);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.isTakePicture = false;
  }
  public clickInMap($event) {
    console.log($event);
    this.points[0].push($event.coordinate);
    console.log(this.points);
    this.mapElement.addAreas(this.points);
    this.area = this.polygonArea(this.points[0]);
    this.areaScaled = Math.round(this.area);
    console.log('area', this.area);
  }

  public findLocation($event) {
    if ($event.detail.value.trim() === '' || $event.detail.value === this.searchQuery) {
      return;
    }
    this.locations = [];
    this.geoApi.findLocation($event.detail.value.trim()).subscribe(
        (res) => {
          res.forEach(loc => this.locations.push({result: loc, is_search_history: false}));
        },
        (err) => {
          console.error(err);
        },
        () => {
          ;
        }
    );
    console.log('findLocation');
  }
  public jumpToLocation(location) {
    this.searchQuery = location.attrs.label.replace('<i>','')
         .replace('</i>','')
         .replace('<b>','')
         .replace('</b>','')
         .replace('-', '');
    console.log('jump to location', location);
    this.locations = [];
    //this.settingsService.addToSearchHistory(location.attrs.label, location);
    this.mapElement.relocate([location.attrs.lon, location.attrs.lat]);
  }

  public clearPoints($event) {
    this.points[0] = [];
    console.log(this.points);
    this.mapElement.addAreas(this.points);
  }

  public editArea($event) {

  }

  public takePicture($event) {
    this.isTakePicture = !this.isTakePicture;
  }

  private polygonArea(coords): number // https://www.mathopenref.com/coordpolygonarea2.html
  {
    let area = 0;   // Accumulates area
    let j = coords.length - 1;

    for (let i = 0; i < coords.length; i++) {
      area +=  (coords[j][0] + coords[i][0]) * (coords[j][1] - coords[i][1]);
      j = i;  //j is previous vertex to i
    }
    return Math.abs( area / 2.0 );
  }
  public zoom(direction) {
    this.mapElement.zoom(direction);
  }
  public distance(zoomValue) {
//    this.mapObject.getView().setResolution(zoomValue);
  }

  public locateMe(event) {
    console.log('locate me', event);
    //this.mapObject.getView().setRotation(0);
    //this.mapObject.getView().setResolution(0.5);
    //this.mapObject.getView().setCenter([2723796.8597967187, 1211314.662645912]);
  }
  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public toggleWebcam(): void {
    this.isTakePicture = !this.isTakePicture;
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
