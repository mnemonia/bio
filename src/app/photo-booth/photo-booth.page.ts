import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {DataService} from '../services/data/data.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-photo-booth',
  templateUrl: './photo-booth.page.html',
  styleUrls: ['./photo-booth.page.scss'],
})
export class PhotoBoothPage implements OnInit {
  public isTakePicture = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;

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

  public webcamHeight: number;
  public webcamWidth: number;

  constructor(private dataService: DataService, private navCtrl: NavController) {
    this.webcamHeight = window.innerHeight - 10;
    this.webcamWidth = window.innerWidth - 20;
  }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
        .then((mediaDevices: MediaDeviceInfo[]) => {
          this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        });
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.dataService.getData().base64_jpeg_image = webcamImage.imageAsBase64;
    this.isTakePicture = false;
    this.dataService.saveData();
    this.navCtrl.back();
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }
  public toggleWebcam(): void {
    this.navCtrl.back();
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
