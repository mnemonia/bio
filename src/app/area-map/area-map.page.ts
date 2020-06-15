import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwissMapComponent} from '../comps/swiss-map/swiss-map.component';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {GeoApiService} from '../services/geoapi/geo-api.service';
import {BioApiService} from '../services/bioapi/bio-api.service';
import {DataService} from '../services/data/data.service';
import {Data} from '../model/data';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-area-map',
  templateUrl: './area-map.page.html',
  styleUrls: ['./area-map.page.scss'],
})
export class AreaMapPage implements OnInit {
  @ViewChild('swissymappy', {static: true}) mapElement: SwissMapComponent;
  points = [];
  area = 0;
  public isTakePicture = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public locations = [];

  public currentData: Data;
  public isSendingData = false;

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

  constructor(private geoApi: GeoApiService,
              private bioApiService: BioApiService,
              private dataService: DataService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.currentData = this.dataService.getData();
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
  public changeAnlegung($event) {
    this.dataService.saveData();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.currentData.base64_jpeg_image = webcamImage.imageAsBase64;
    this.isTakePicture = false;
    this.dataService.saveData();
  }
  public clickInMap($event) {
    this.points[0].push($event.coordinate);
    this.mapElement.addAreas(this.points);
    this.area = this.polygonArea(this.points[0]);
    this.currentData.area_polyline = this.points[0];
    this.currentData.area_in_m2 = Math.round(this.area);
    this.dataService.saveData();
  }

  public findLocation($event) {
    if ($event.detail.value.trim() === '' || $event.detail.value === this.currentData.address_canonical) {
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
  }
  public jumpToLocation(location) {
    this.currentData.address_canonical = location.attrs.label.replace('<i>',' ')
         .replace('</i>','')
         .replace('<b>',' ')
         .replace('</b>','')
         .replace('-', ' ');
    this.dataService.saveData();
    this.locations = [];
    this.mapElement.relocate([location.attrs.lon, location.attrs.lat]);
  }

  public clearPoints($event) {
    this.points[0] = [];
    this.mapElement.addAreas(this.points);
  }

  public editArea($event) {

  }

  public takePicture($event) {
    this.isTakePicture = !this.isTakePicture;
  }

  public sendData($event) {
    this.isSendingData = true;
    this.dataService.addToHistory(this.currentData);

    this.bioApiService.sendData(this.currentData).subscribe(
        (res) => {
          console.log('sendData', res);
        },
        (err) => {
          console.error(err);
          this.isSendingData = false;
        },
        () => {
          this.currentData = this.dataService.newData();
          this.mapElement.addAreas(this.currentData.area_polyline);
          this.isSendingData = false;
          this.navCtrl.navigateForward('/tabs/my-areas');
        }
    );
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
