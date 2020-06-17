import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings/settings.service';
import {Anlegung, Data} from '../model/data';
import {AnlegungService} from '../services/anlegung/anlegung.service';
import {DataService} from '../services/data/data.service';

@Component({
  selector: 'app-anlegung-selektion',
  templateUrl: './anlegung-selektion.page.html',
  styleUrls: ['./anlegung-selektion.page.scss'],
})
export class AnlegungSelektionPage implements OnInit {
  public data: Data;
  //public anlegungen: Anlegung[] = [];
  public anleg: any[] = [];

  constructor(private settingsService: SettingsService,
              private anlegungService: AnlegungService,
              private dataService: DataService) {}

  ngOnInit() {
    this.data = this.dataService.getData();
    this.anlegungService.findAll().subscribe(
        (data) => data.forEach(a => {
          const c = {'a': a, 'da': a};
          this.data.anlegungen_.filter(da => da.id === a.id).forEach(da => c.da = da);
          this.anleg.push(c);
        }),
        (err) => console.error(err),
        () => {
        }
    );
  }

  public toggleAnlegung(anl: any) {

    const p = this.data.anlegungen_.indexOf(anl.da);
    if (p < 0) {
      this.data.anlegungen_.push(anl.da);
    } else {
      this.data.anlegungen_ = this.data.anlegungen_.filter(a => a.id !== anl.da.id);
    }
    console.log('toggleAnlegung', this.data.anlegungen_);
    this.dataService.saveData();
  }

}
