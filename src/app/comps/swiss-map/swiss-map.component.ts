import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

declare var ga;
declare var ol;


@Component({
  selector: 'app-swiss-map',
  templateUrl: './swiss-map.component.html',
  styleUrls: ['./swiss-map.component.scss'],
})
export class SwissMapComponent implements OnInit {
  @ViewChild('swissMap', {static: true}) mapElement: ElementRef;
  @Output() onMapEvent = new EventEmitter();
  private swisstopo;
  private solarLayer;
  private currentLayer = null;
  private currentPointsLayer = null;
  public mapObject;
  private _mapData;
  private _mapResolution = 0.1;
  private _mapCenter = [2723692.8416339746, 1211615.5110511137];
  @Input()
  set mapCenter(mc: number[]) {
    this._mapCenter = mc;
    if (this.mapObject === undefined) {
      return;
    }
    this.mapObject.getView().setCenter(this._mapCenter);
  }
  get mapCenter() {return this._mapCenter;}

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.loadMap(), 750);
  }

  private loadMap() {
    // console.log(this.mapElement);
    const boxStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.3)'
      }),
      stroke: new ol.style.Stroke({
        color: '#00FF00',
        width: 2
      })
    });

    this.mapObject = new ga.Map({

      // Define the div where the map is placed
      target: 'swissMap',
      // layers: [
      //     //createLayer('ch.swisstopo.swissimage', 'current')
      //     createLayer('ch.swisstopo.pixelkarte-grau', 'current')
      // ],
      // Create a view
      view: new ol.View({
        // Define the default resolution
        // 10 means that one pixel is 10m width and height
        // List of resolution of the WMTS layers:
        // 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5, 0.25, 0.1
        resolution: this._mapResolution, //0.5, //20,

        // Define a coordinate CH1903+ (EPSG:2056) for the center of the view
        center: this._mapCenter
      })
    });
    this.mapObject.disableTooltip();
    this.mapObject.on('click', ($event) => {
      this.onClickInMap($event);
    });
    this.mapObject.on('moveend', ($event) => {
      console.warn('map drag', $event);
      //this.onMapMoveEvent.emit($event);
    });
    this.mapObject.getControls().forEach(c => {
      this.mapObject.removeControl(c);
    });
    this.swisstopo = ga.layer.create('ch.swisstopo.swissimage');
    this.swisstopo.setVisible(true);
    this.mapObject.addLayer(this.swisstopo);
  }

  // private addSolarRoofLayer() {
  //   if (this.solarLayer !== undefined) {
  //     this.mapObject.removeLayer(this.solarLayer);
  //   }
  //   this.solarLayer = ga.layer.create('ch.bfe.solarenergie-eignung-daecher', {opacity: 0.5});
  //   this.mapObject.addLayer(this.solarLayer);
  // }
  public onClickInMap(event) {
    this.onMapEvent.emit(event);
  }

  public addAreas(rings: any[]) {
    if (this.currentLayer !== null) {
      this.mapObject.removeLayer(this.currentLayer);
    }
    if (this.currentPointsLayer !== null) {
      this.mapObject.removeLayer(this.currentPointsLayer);
    }
    if (rings.length === 0) {
      return;
    }
    if (this.mapObject === undefined) {
      setTimeout(() => {
        this.addAreas(rings);
      }, 1500);
      return;
    }
    const theFeatures = [];
    rings.forEach(ring => {
      console.log('ring', ring);
      ring.forEach(r => {
        const point = new ol.geom.Point(r);
        const feature = new ol.Feature({
          geometry: point
        });
        point.on('click', ($event) => {
          console.log('click bubble', $event);
          //this.onClickInMap($event);
        });
        theFeatures.push(feature);
      });
    });
    this.currentPointsLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: theFeatures
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          //src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLCAwhG8L1qXwAAAJ1SURBVDjLTZPBThRBEIa/6uleYtDVA8QHUGIw4ehVb3Ii+AK+guGid696Ud/AN4BAiFw9ePUAbmK4SIAo7OxuZtnZmZ7umfLQED1U0of6qur/q1oA9PgYWVlBBwNHCGt4v8Ws3GRa9BmPoSimDIc7jEYfqOtD+fw56MYGsruL6GCAPH6Mqjq+f9+jbZ9T1zArYVoo4zFMJsJoBMMh5PkBT55syNu3QZ89QwD07MxxcjJBZJEQFGME7+H8HC4vIc+5LqSMRsJsVuDcsnz7Fozu7zuOjvYoy0WKqeKccP8+3LkDvoHJJEVRwHQqVJVydXWXP392dXXVWcpyjbZ9DiggGIGmgdNTOPkFFxc3MMxmUJaCb5TQrBPCmmU43AKg64QQElhVMBrDZJzgsryBoaohBiFGEHllyfNNOoW2BV9DNU8G3gBlCfM51HWCQ4BOQQxo98Ly+3cfa5UQJCVVCZjP07uuUzQNhAhdB5kBI4qau5Y8hyxLlb3/B3gPtU9gDBDbZJPNQIRr2Viqaor3fWJMyU2T3G8aaGOS1ikYAZOBMSlAiLGwVNUOV1cvaVuIMU0S22uwTbvJDFgLCwsJjhFUQXXbEOMHQoC6VrxPBdr4H5wl8N49WFqC27eh11NcD5z7ZFjoHaJ6QIhCjErbpe4qSa+zcOsWLC4mCaqKdYK1X/D1YTrlN68de/s51byPqoIImUnde700Qa8HoIgIIRT8OFqWeRWMrq8j794HHj1YQuQA1XSNxkCWKSJK26YVqgqdfuHnz2WZV0EfPrz+TE+fIl+/oqurDu/XMGYLkU2c62MtwJQs28aYj1TVoQwGQVdWkONj/gL3ho+XUT2DTgAAAABJRU5ErkJggg=='
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACDklEQVR4nM2UvU6UQRSGnznzB+yyq8QQTIylhhgvwMTEylgRe2NtYSwsTIyUBm/CWNuLF7ChtMUSDAUQUVgEN+6y3zc/FkDQmCADknia08w7zznvOTNwzqFKDn+8/uTN+mDnKkbtXRhp4loNXLuJbY1hm2NoI4gSJKG+L62tTi/MPTYlANdqXgnDb3eNEjSCjgoTwQWFT4L3Day29D9vbUwvzM0AFAFkopFlU3DGJa210iFn9aNCxCqpVWajr/pVtTvVmb18qCkC6Est1GKNyUa05KRVFBkEVNVP4qLEETuY6sxe/K2oog7GPVoJLoIMI1KDRXDOYaxlsvNi7A9NCSDt7mHE4q1P1jtlrU3e++SsVUBev/1y50yA2O1hjcZbJ8a67L0Ta50oJTmlpKSK7ZV7r76cHrDdw4jBOYe3VpzzaK1JKUqIgRADcW17cvHm05VDTdGQN29MxO3l/rLf7K/6FBiECoCUEiEGQh2o64phPVQLkw9e3/n69lERYGPmWnfpk/lw//mzhyfVFFlkjSBFb78QYLRBlf0uhQCjUefZgTaGUsL/ZdHoqE8h1EWAojU9JjTggAykg5yB9C8ADhhnv9gMRKAG9oBwVsAI0AIsR9VzkCOczaIm4IEeR7bAL/acGqCUauecHbALVMedLdqiw8g5e2Dnb5fD/vRPHCnnW+/n5+tud+sdEE6i+QlTOLv/psYRHwAAAABJRU5ErkJggg=='
        })
      })
    });
    const polygon = new ol.geom.Polygon(rings);
    const boxStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.3)'
      }),
      stroke: new ol.style.Stroke({
        color: '#00FF00',
        width: 2
      })
    });

    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: polygon
        })]
      }),
      style: boxStyle
    });
    this.mapObject.addLayer(vectorLayer);
    this.mapObject.addLayer(this.currentPointsLayer);

    this.currentLayer = vectorLayer;
    this.mapObject.renderSync();
  }

  public zoom(direction) {
    let zoomValue = this.mapObject.getView().getZoom();
    const increment = 0.2;
    if (direction === 'plus') {
      zoomValue += increment;
    } else {
      zoomValue -= increment;
    }
    this.mapObject.getView().setZoom(zoomValue);
  }

  public relocate(coordinate) {
    if (this.mapObject === undefined) {
      setTimeout(() => {
        this.relocate(coordinate);
      }, 1000);
      return;
    }
    const position = ol.proj.fromLonLat(coordinate, 'EPSG:2056');
    this.mapObject.getView().setRotation(0);
    //this.mapObject.getView().setResolution(0.25);
    this.mapObject.getView().setCenter(position);
    this.mapElement.nativeElement.click();
  }
}
