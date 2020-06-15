import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwissMapComponent} from '../comps/swiss-map/swiss-map.component';

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
  public areaName = 'Neue Fläche';

  constructor() { }

  ngOnInit() {
    this.points.push([]);
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

  public clearPoints($event) {
    this.points[0] = [];
    console.log(this.points);
    this.mapElement.addAreas(this.points);
  }

  public editArea($event) {

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
  //  let zoomValue = this.mapObject.getView().getZoom();
    const increment = 0.2;
    if (direction === 'plus') {
  //    zoomValue += increment;
    } else {
   //   zoomValue -= increment;
    }
  //  this.mapObject.getView().setZoom(zoomValue);
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
}
