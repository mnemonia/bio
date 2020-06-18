import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';
import {Data} from '../../model/data';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {
  private token = '4979764e-f018-4978-bd0b-41e741905b5d';
  private imageDisplayHeight = 360; // px
  private imageDisplayWidth = 1024; // px
  private imageDisplayResolution = 96; // dpi
  private URL = 'https://api.geo.admin.ch';
  private IDENTIFY_PATH = '/rest/services/api/MapServer/identify';
  private QUERY_PARAMS = '?geometryType=esriGeometryPoint&geometryFormat=esrijson&tolerance=1&order=distance&returnGeometry=true&layers=all:ch.bfe.solarenergie-eignung-daecher&lang=de&sr=2056';//mapExtent=2724878.382441501,1210388.528680723,2724977.382441501,1210423.528680723&tolerance=10&sr=2056&layers=all:ch.swisstopo.fixpunkte-agnes,ch.bfe.solarenergie-eignung-daecher&lang=de&callback=olc_824';

  constructor(private httpService: HttpClient) { }

  public findLocation(query: string): Observable<any> {
    const url = '//api3.geo.admin.ch/rest/services/api/SearchServer?lang=de&searchText=' + query + '&type=locations&limit=5&sr=2056';
    return this.httpService.get(url).pipe(
        // tap(res => console.log(res)),
        map((res: any) => res.results)
    );
  }

  public identify(event): Observable<any> {
    this.imageDisplayWidth = window.innerWidth;

    //console.warn(event);
    if (event.frameState === undefined) {
      return of(event);
    }
    let query = '&mapExtent=' + event.frameState.extent;
    query += '&geometry=' + event.coordinate;
    query += '&imageDisplay=' + [window.innerWidth, this.imageDisplayHeight, this.imageDisplayResolution]; // imageDisplay=990,350,96
    return this.httpService.get(this.URL + this.IDENTIFY_PATH + this.QUERY_PARAMS + query).pipe(
        tap(res => console.log('res', res)),
        map((res: any) => res.results[0])
    );
  }

  public addressify(event): Observable<any> {
    this.imageDisplayWidth = window.innerWidth;
    const url = 'https://api.geo.admin.ch/rest/services/api/MapServer/identify?geometryType=esriGeometryPoint&geometryFormat=esrijson&tolerance=50&order=distance&returnGeometry=false&layers=all:ch.swisstopo.amtliches-strassenverzeichnis,ch.bfs.gebaeude_wohnungs_register,ch.swisstopo.amtliches-gebaeudeadressverzeichnis,ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill,ch.swisstopo-vd.amtliche-vermessung&lang=de&sr=2056&mapExtent=' + event.frameState.extent + '&geometry=' + event.coordinate + '&imageDisplay=' + [this.imageDisplayWidth, this.imageDisplayHeight, this.imageDisplayResolution];
    return this.httpService.get(url).pipe(
        //tap(res => console.warn('addressify', res)),
        filter((res: any) => res.results.length > 0),
        map((res: any) => {
          const info = {
            gdename: '',
            gdekt: '',
            gdenr: 0,
            egid: '',
            strname1: '',
            plz4: '',
            plzname: '',
            deinr: ''
          };
          // console.log('info 1', info);
          res.results
              .filter(feature => feature.layerBodId === 'ch.swisstopo-vd.amtliche-vermessung')
              //.filter(feature => feature.attribute !== undefined)
              .forEach(feature => {
                info.gdekt = feature.attributes.ak;
                info.gdenr = feature.attributes.bfsnr;
              });
          //console.log('info 2', info);
          res.results
              .filter(feature => feature.layerBodId === 'ch.swisstopo.amtliches-strassenverzeichnis')
              .filter(feature => feature.attributes !== undefined)
              .forEach(feature => {
                info.strname1 = feature.attributes.label;
                info.gdenr = feature.attributes.gdenr;
                try {
                  //info.plz4 = feature.attributes.plzo.split(' ')[0];
                  info.plz4 = feature.attributes.plzo.match(/(\d\d\d\d) .*[A-Z]?[A-Z]?.*/g)[0];//(/(\d\d\d\d) .* [A-Z][A-Z].*/g)[0];
                  info.plzname = feature.attributes.plzo.match(/\d\d\d\d (.*).*[A-Z]?[A-Z]?.*/g)[0];
                } catch (e) {
                  console.error(e);
                }
              });
          //console.log('info 3', info);
          const amtliches = res.results
              .filter(feature => feature.layerBodId === 'ch.swisstopo.amtliches-gebaeudeadressverzeichnis')
              //.filter(feature => feature.attributes !== undefined)
              .find(feature => feature.layerBodId === 'ch.swisstopo.amtliches-gebaeudeadressverzeichnis');
          if (amtliches !== undefined && amtliches.attributes !== undefined) {
            info.strname1 = amtliches.attributes.str_label;
            info.gdename = amtliches.attributes.com_name;
            info.egid = amtliches.attributes.bdg_egid;
            try {
              info.plz4 = amtliches.attributes.adr_zip.split(' ')[0];
              info.plzname = amtliches.attributes.adr_zip.split(' ')[1];
            } catch (e) {
              console.error(e);
            }
          }
          //console.log('info 4', info);
          // res.results
          //     .filter(feature => feature.layerBodId === 'ch.swisstopo.amtliches-gebaeudeadressverzeichnis')
          //     .forEach(feature => {
          //       info.strname1 = feature.attributes.str_label;
          //       info.gdename = feature.attributes.com_name;
          //       info.egid = feature.attributes.bdg_egid;
          //       info.plz4 = feature.attributes.adr_zip.split(' ')[0];
          //       info.plzname = feature.attributes.adr_zip.split(' ')[1];
          //     });
          res.results
              .filter(feature => feature.layerBodId === 'ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill')
              //.filter(feature => feature.attributes !== undefined)
              .forEach(feature => {
                info.gdekt = feature.attributes.kanton;
                info.gdename = feature.attributes.gemname;
                try {
                  info.gdename = feature.attributes.gemname.split('(')[0].trim();
                } catch (e) {
                  console.error(e);
                }
              });
          //console.log('info 5', info);
          const gebaeudez = res.results
              .filter(feature => feature.layerBodId === 'ch.bfs.gebaeude_wohnungs_register')
          //.first(feature => feature.layerBodId === 'ch.bfs.gebaeude_wohnungs_register');
          //console.log('gebaeude', gebaeudez);
          if (gebaeudez.length > 0 && gebaeudez[0].attributes !== undefined) {
            info.gdename = gebaeudez[0].attributes.gdename;
            info.gdekt = gebaeudez[0].attributes.gdekt;
            info.gdenr = gebaeudez[0].attributes.gdenr;
            info.egid = gebaeudez[0].attributes.egid;
            info.deinr = gebaeudez[0].attributes.deinr;
            info.plzname = gebaeudez[0].attributes.plzname;
          }
          console.log('info 6', info);
          return info;
        })
    );
  }

  public grundstueck_informationen(data: Data): Observable<any> {
    switch (data.gdekt) {
      case 'GL':
        return this.geoApiKantonGLService_grundstueck_informationen(data);
      default:
        return of({});
    }
  }
  private geoApiKantonGLService_grundstueck_informationen(data: Data) {
    const url = 'https://bio.capturetec.ch/cgi-bin/geo.api.gl.php?x=' + data.center_coordinate[0]
        + '&y=' + data.center_coordinate[1]
        + '&token=' + this.token;
    return this.httpService.get(url);
  }
  public eigentuemer(data: Data): Observable<any> {
      switch (data.gdekt) {
          case 'GL':
              const url = 'https://bio.capturetec.ch/cgi-bin/geo.api.gl.eigentuemer.php?x=' + data.center_coordinate[0]
                  + '&y=' + data.center_coordinate[1]
                  + '&token=' + this.token;
              return this.httpService.get(url);
          default:
              return of({});
      }
  }
}
