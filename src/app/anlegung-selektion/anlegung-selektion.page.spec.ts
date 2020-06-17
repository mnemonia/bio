import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnlegungSelektionPage } from './anlegung-selektion.page';

describe('AnlegungSelektionPage', () => {
  let component: AnlegungSelektionPage;
  let fixture: ComponentFixture<AnlegungSelektionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnlegungSelektionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnlegungSelektionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
