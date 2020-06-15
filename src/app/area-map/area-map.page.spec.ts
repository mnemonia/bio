import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreaMapPage } from './area-map.page';

describe('AreaMapPage', () => {
  let component: AreaMapPage;
  let fixture: ComponentFixture<AreaMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreaMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
