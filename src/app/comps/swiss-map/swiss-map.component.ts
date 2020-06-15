import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

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
  public mapObject;
  private _mapData;
  private _mapResolution = 0.25;
  private _mapCenter = [2723644.105558084, 1210872.288992418];

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
    if (rings.length === 0) {
      return;
    }
    if (this.mapObject === undefined) {
      setTimeout(() => {
        this.addAreas(rings);
      }, 1500);
      return;
    }

    // const polygon2 = new ol.geom.Polygon(
    //     [[[res.bbox[0], res.bbox[3]],
    //         [res.bbox[0], res.bbox[1]],
    //         [res.bbox[2], res.bbox[1]],
    //         [res.bbox[2], res.bbox[3]],
    //         [res.bbox[0], res.bbox[3]]]]
    // );
    // var polygon = new ol.geom.Polygon(
    //     [[[west, north],
    //       [west, south],
    //       [east, south],
    //       [east, north],
    //       [west, north]]]
    // );
    // $("#north").val(Math.round(bbox[3]));
    // $("#south").val(Math.round(bbox[1]));
    // $("#east").val(Math.round(bbox[2]));
    // $("#west").val(Math.round(bbox[0]));
    // https://codepen.io/geoadmin/pen/NxQmvo?editors=0010

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
    // const polygon2 = new ol.geom.Polygon(
    //     [[[bbox[0], bbox[3]],
    //         [bbox[0], bbox[1]],
    //         [bbox[2], bbox[1]],
    //         [bbox[2], bbox[3]],
    //         [bbox[0], bbox[3]]]]
    // );

    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: polygon
        })]
      }),
      style: boxStyle
    });
    this.mapObject.addLayer(vectorLayer);
    this.currentLayer = vectorLayer;
    this.mapObject.renderSync();
  }

}
