import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryDataPage } from './history-data.page';

describe('HistoryDataPage', () => {
  let component: HistoryDataPage;
  let fixture: ComponentFixture<HistoryDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
