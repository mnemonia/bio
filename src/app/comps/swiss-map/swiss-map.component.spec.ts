import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwissMapComponent } from './swiss-map.component';

describe('SwissMapComponent', () => {
  let component: SwissMapComponent;
  let fixture: ComponentFixture<SwissMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwissMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwissMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
