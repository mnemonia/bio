import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoApiService {

  constructor(private httpService: HttpClient) { }

  public findLocation(query: string): Observable<any> {
    const url = '//api3.geo.admin.ch/rest/services/api/SearchServer?lang=de&searchText=' + query + '&type=locations&limit=5&sr=2056';
    return this.httpService.get(url).pipe(
        // tap(res => console.log(res)),
        map((res: any) => res.results)
    );
  }

}
