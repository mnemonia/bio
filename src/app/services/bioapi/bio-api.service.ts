import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BioApiService {
  token = '4979764e-f018-4978-bd0b-41e741905b5d';

  constructor(private httpService: HttpClient) { }

  public sendData(data): Observable<any> {
    const url = 'https://bio.capturetec.ch/cgi-bin/bio.api.php?token=' + this.token;
    return this.httpService.post(url, JSON.stringify(data)).pipe(
        tap(res => console.log('bio.api.php', res))
    );
  }
}
