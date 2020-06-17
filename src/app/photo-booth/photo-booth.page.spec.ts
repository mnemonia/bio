import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoBoothPage } from './photo-booth.page';

describe('PhotoBoothPage', () => {
  let component: PhotoBoothPage;
  let fixture: ComponentFixture<PhotoBoothPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoBoothPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
